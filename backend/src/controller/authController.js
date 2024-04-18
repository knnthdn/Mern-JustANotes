import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";
import sendEmail from "../../utils/email.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOption = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    secure: process.env.NODE_ENV !== "development" ? true : false,
    httpOnly: true,
  };

  res.cookie("notes_cookies", token, cookieOption);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    data: user,
  });
};

const signup = catchAsync(async (req, res, next) => {
  const isEmailExist = await User.findOne({ email: req.body.email });

  if (isEmailExist)
    return next(new AppError("Email is already Registered!", 400));

  const newUser = await User.create(req.body);
  createSendToken(newUser, 201, res);
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //check if theres email or password
  if (!email || !password)
    return next(new AppError("Missing credentials.", 400));

  // check if email is exist in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new AppError("Incorrect email or password.", 400));

  // Check if email and password are matched

  const isCorrectPassword = await user.comparePassword(password, user.password);

  if (!user || !isCorrectPassword)
    return next(new AppError("Incorrect email or password!", 400));

  createSendToken(user, 200, res);
});

const protect = catchAsync(async (req, res, next) => {
  let token;

  if (req.cookies.notes_cookies) {
    token = req.cookies.notes_cookies;
  }

  if (!token)
    return next(
      new AppError("Unauthorized action, Please login first...", 401)
    );

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  if (!user)
    return next(
      new AppError("The user belonging this token is no longer exist.", 401)
    );

  if (user.isPasswordChange(decoded.iat))
    return next(
      new AppError("User Password recenty changed, Please login again... ", 401)
    );

  req.user = user;

  next();
});

const changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findById(req.user._id).select("+password");

  const isPasswordCorrect = await user.comparePassword(
    currentPassword,
    user.password
  );

  if (!isPasswordCorrect)
    return next(new AppError("Current password is incorrect!", 400));

  user.password = newPassword;
  user.confirmPassword = confirmPassword;
  user.passwordChangeAt = Date.now();
  await user.save();

  res.status(200).json({
    status: "success",
  });
});

const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user)
    return next(new AppError("There's no user exist in provided email!", 404));

  const reset = await user.generateResetCode();
  await user.save({ validateBeforeSave: false });

  try {
    await sendEmail({
      email: req.body.email,
      subject: "Valid for 5 minutes only",
      message: `Your reset code: ${reset}`,
    });
    res.status(200).json({
      status: "success",
      message: "code sent to email.",
    });
  } catch (error) {
    console.log(error);
    user.resetCode = undefined;
    user.resetExpire = undefined;
    next(new AppError("there was error sending email!", 500));
  }
});

const resetPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new AppError("Specify email again!", 400));

  if (!user?.resetCode)
    return next(
      new AppError("code doesnt exist please, Request for new one.", 400)
    );

  if (!user?.resetCode || !user?.resetExpire)
    return next(new AppError("Incorrect code!", 400));

  const isCodeCorrect = await user.comparePassword(
    req.body.code,
    user.resetCode
  );

  if (!isCodeCorrect) return next(new AppError("Incorrect code!", 400));

  const isCodeValid = Date.now() > user.resetExpire;

  if (isCodeValid)
    return next(new AppError("Request Code is already expired!", 400));

  const updateUser = await User.findById(user._id);

  updateUser.password = req.body.password;
  updateUser.confirmPassword = req.body.confirmPassword;
  updateUser.passwordChangeAt = Date.now();
  updateUser.resetCode = undefined;
  updateUser.resetExpire = undefined;
  await updateUser.save();

  res.status(200).json({
    status: "success",
    message: "Password reset successfully",
  });
});

const logout = catchAsync(async (req, res, next) => {
  res.cookie("notes_cookies", "", { maxAge: 1 });

  res.status(200).json({ status: "success" });
});

export default {
  signup,
  login,
  protect,
  forgotPassword,
  resetPassword,
  logout,
  changePassword,
};
