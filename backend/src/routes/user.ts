import express, { Request, Response } from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
import { Account, User } from "../db";
import { JWT_SECRET } from "../config";
import { authMiddleware } from "../middleware";

const userRouter = express.Router();

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

userRouter.post("/signup", async (req: Request, res: Response) => {
  const { success, error } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Invalid input",
      details: error.errors,
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.json({
    message: "User created successfully",
    token,
  });
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

userRouter.post("/signin", async (req: Request, res: Response) => {
  const { success, error } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Invalid input",
      details: error.errors,
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.json({
      message: "Logged in successfully",
      token,
    });
  } else {
    res.status(401).json({
      message: "Invalid username or password",
    });
  }
});

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

userRouter.put("/", authMiddleware, async (req: Request, res: Response) => {
  const { success, error } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Invalid input",
      details: error.errors,
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);
  res.json({
    message: "Updated successfully",
  });
});

userRouter.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: filter,
          $options: "i",
        },
      },
    ],
  });

  res.json({
    users: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

export default userRouter;
