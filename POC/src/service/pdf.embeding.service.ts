import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAIEmbeddings } from "@langchain/openai";
import dotenv from "dotenv";

dotenv.config();
import { vectorStore } from "../utils/vector.store";
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

    const store = await vectorStore();

    await store.addDocuments(document);

    console.log(`Document indexed: ${file.originalname} is Done`);
  });
};
