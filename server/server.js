import express from "express";
import "./config/dotenv";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
