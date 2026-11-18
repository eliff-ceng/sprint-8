import mongoose from "mongoose";

export const EVENT_CATEGORIES = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    category: {
      type: String,
      required: true,
      enum: EVENT_CATEGORIES,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    capacity: {
      type: Number,
      min: 0,
      default: 0,
    },
    time: { type: String, trim: true, default: "" },
    location: { type: String, trim: true, default: "" },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
      default: "",
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
