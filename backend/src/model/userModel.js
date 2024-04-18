import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import generate from "../../utils/generate.js";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: "String",
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: "String",
      required: [true, "User Password is required"],
      minLength: [8, "Password must have equal or greaterthan 8 character"],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Password is not match",
      },
    },
    nickname: String,
    passwordChangeAt: Date,
    resetCode: String,
    resetExpire: Date,
    accountCreated: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("notes", {
  ref: "Notes",
  foreignField: "notesFrom",
  localField: "_id",
});

// userSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "notes",
//   });
//   next();
// });

// encrypt password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.confirmPassword = undefined;

  next();
});

//comparePassword
userSchema.methods.comparePassword = async function (
  candidateValue,
  currentValue
) {
  return await bcrypt.compare(candidateValue, currentValue);
};

userSchema.methods.isPasswordChange = function (JWTTimestamp) {
  if (this?.passwordChangeAt) {
    const parseTime = +this.passwordChangeAt.getTime() / 1000;

    return parseTime > JWTTimestamp;
  }

  return false;
};

userSchema.methods.generateResetCode = async function () {
  const generateCode = generate();

  this.resetCode = await bcrypt.hash(generateCode, 12);
  this.resetExpire = Date.now() + 50 * 6 * 1000;
  console.log(this.resetCode);
  return generateCode;
};

const User = mongoose.model("User", userSchema);

export default User;
