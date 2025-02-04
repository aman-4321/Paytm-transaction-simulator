import express, { Request, Response } from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { rootRouter } from "./routes";
import { configDotenv } from "dotenv";

configDotenv();

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
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
