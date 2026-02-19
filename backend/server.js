import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is listening to port ${port}`);
});
