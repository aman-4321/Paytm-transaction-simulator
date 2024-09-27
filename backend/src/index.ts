require("dotenv").config();
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { rootRouter } from "./routes";

const app = express();
const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: ["https://paytm.webprojects.live"],
  }),
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: "Too many requests from this IP, please try again later",
});

app.use(limiter);

app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(port);
