import Router from "express";
import { UploadFile } from "../middlewares/file.upload";
import { pdfEmbeddingService } from "../service/pdf.embeding.service";

export const router = Router();

router.post("/pdf-embedding", UploadFile, async (req, res) => {
  try {
    await pdfEmbeddingService(req.files as Express.Multer.File[]);

    res.json({
      status: 201,
      message: "PDF files processed and indexed successfully",
    });
  } catch (error) {
    console.error("Error occurred while processing PDF files:", error);

    res.json({
      status: 500,
      message: "Error occurred while processing PDF files",
    });
  }
});
