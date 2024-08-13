require("dotenv").config();
import express from "express";
import cors from "cors";
import { rootRouter } from "./routes";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(port);
