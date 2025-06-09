import express from "express";
import RootRouter from "./routes/index.js";

const app = express();

app.use(express.json());

app.use("/api/v1", RootRouter);

export default app;
