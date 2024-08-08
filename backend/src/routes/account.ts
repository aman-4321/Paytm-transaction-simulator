import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Account } from "../db";
import { authMiddleware } from "../middleware";

export const accountRouter = express.Router();

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

accountRouter.get(
  "/balance",
  authMiddleware,
  async (req: Request, res: Response) => {
    const account = await Account.findOne({
      userId: req.userId,
    });

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }
    res.json({
      balance: account.balance,
    });
  },
);

accountRouter.post(
  "/transfer",
  authMiddleware,
  async (req: Request, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { amount, to } = req.body;

      const account = await Account.findOne({ userId: req.userId }).session(
        session,
      );

      if (!account || account.balance < amount) {
        throw new Error("Insufficient balance");
      }

      const toAccount = await Account.findOne({ userId: to }).session(session);

      if (!toAccount) {
        throw new Error("Invalid account");
      }

      await Account.updateOne(
        { userId: req.userId },
        { $inc: { balance: -amount } },
      ).session(session);
      await Account.updateOne(
        { userId: to },
        { $inc: { balance: amount } },
      ).session(session);

      await session.commitTransaction();

      res.json({
        message: `Transfer successful, Rupees ${amount} transferred successfully`,
      });
    } catch (error: any) {
      await session.abortTransaction();
      res.status(400).json({
        message: error.message,
      });
    } finally {
      session.endSession();
    }
  },
);
