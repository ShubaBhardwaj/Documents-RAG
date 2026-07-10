import express from "express";
import cors from "cors";
import { router as pdfEmbeddingRouter } from "./routes/pdf.embedding.route";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello, From RAG POC" });
});

app.use(pdfEmbeddingRouter);

export default app;
