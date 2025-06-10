import express from "express";
import RootRouter from "./routes/index.js";
import cors from "cors";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use("/api/v1", RootRouter);

export default app;
