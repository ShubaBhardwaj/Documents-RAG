import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";
import { Express } from "express";
import dotenv from "dotenv";

dotenv.config();
export const pdfEmbeddingService = async (
  pdfFiles: Express.Multer.File[],
): Promise<void> => {

  pdfFiles.forEach(async (file) => {
    const loader = new PDFLoader(file.path);
    const document = await loader.load(); // Already chunks data page by page

    // Initalize the embedding model
    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
      apiKey: process.env.OPENAI_API_KEY,
    });

    // The vector store
    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings, // Use this embedding model
      {
        url: "http://localhost:6333",
        collectionName: "chaicode-docs",
      },
    );

    await vectorStore.addDocuments(document);
    console.log(`Document indexed: ${file.originalname} is Done`);
  });
  
};
