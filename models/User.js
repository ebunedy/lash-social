const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { model, Schema } = mongoose;
const ObjectId = Schema.ObjectId;

const userModel = new Schema(
  {
    id: ObjectId,
    name: {
      type: String,
      required: [true, "please provide name"],
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    username: {
      type: String,
      required: [true, "please provide username"],
      minLength: 3,
      maxLength: 25,
      trim: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "please provide email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      minLength: 8,
      required: [true, "please provide password"],
    },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    photo: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/duakyn1ou/image/upload/v1664969993/file-upload/tmp-1-1664969991069.jpg",
    },
  },

  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

userModel.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/** compare password  */
userModel.methods.comparePasswords = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

module.exports = model("User", userModel);
