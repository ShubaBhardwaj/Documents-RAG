import { OpenAIEmbeddings } from "@langchain/openai";
import { QdrantVectorStore } from "@langchain/qdrant";

import dotenv from "dotenv";

dotenv.config();

const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
  apiKey: process.env.OPENAI_API_KEY,
});

// The vector store
export const vectorStore = async () => {
  return await QdrantVectorStore.fromExistingCollection(
    embeddings, // Use this embedding model
    {
      url: "http://localhost:6333",
      collectionName: "chaicode-docs",
    },
  );
};
