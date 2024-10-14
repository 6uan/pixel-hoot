import express from "express";
import "./config/dotenv.js";
import cors from "cors";
import assetRouter from "./routes/assets.js";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.use("/assets", assetRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
