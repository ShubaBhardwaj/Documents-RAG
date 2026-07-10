import app from "./app";
import "dotenv/config";



const startServer = async () => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Error starting the server:", error);
});
