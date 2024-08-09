import mongoose from "mongoose";

const mongodbUrl = process.env.MONGODB_URL;

if (!mongodbUrl) {
  throw new Error("MONGODB_URL environment variable is not set");
}

mongoose
  .connect(mongodbUrl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 30,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },

  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
});

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

export const Account = mongoose.model("Account", accountSchema);
export const User = mongoose.model("User", userSchema);
