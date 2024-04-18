import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
  {
    notesFrom: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Notes must have a owner"],
    },
    title: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    isRecycled: {
      type: Boolean,
      default: false,
    },
    notesPreference: {
      theme: {
        bg: {
          type: String,
          default: "bg-white",
        },
        color: {
          type: String,
          default: "text-[#2e2e2e]",
        },
      },
      fontSize: {
        type: String,
        default: "text-base",
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Notes = mongoose.model("Notes", notesSchema);

export default Notes;
