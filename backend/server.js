import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import { DBConnection } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;

app.use("/api/auth", authRouter);

app.listen(port, async () => {
  console.log(`Server is listening to port ${port}`);
  await DBConnection();
});
