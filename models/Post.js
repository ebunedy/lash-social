const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const postModel = Schema(
  {
    title: {
      type: String,
      required: [true, "please provide post title"],
      trim: true,
    },
    desc: {
      type: String,
      required: [true, "please provide the body of your post"],
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/duakyn1ou/image/upload/v1664970087/file-upload/tmp-1-1664970085576.jpg",
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = model("Post", postModel);
