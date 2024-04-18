import AppError from "../../utils/appError.js";
import catchAsync from "../../utils/catchAsync.js";
import User from "../model/userModel.js";

const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("notes");

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

const setNickname = catchAsync(async (req, res, next) => {
  console.log(req.user);
  if (!req?.user)
    return next(new AppError("Unauthorized action, Please login first!", 403));

  await User.findByIdAndUpdate(
    req.user._id,
    { nickname: req.body.nickname },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    nickname: req.body.nickname,
  });
});

export default {
  getUser,
  setNickname,
};
