import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import rateLimiter from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

import userRouter from "./routes/userRoute.js";
import notesRouter from "./routes/notesRoute.js";
import notFoundContoller from "./controller/notFoundContoller.js";
import globalError from "./controller/errorContoller.js";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(console.log("MongoDB connected successfully..."));

const app = express();
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

//set security header
app.use(helmet());

// limiter
const limiter = rateLimiter({
  max: 100,
  windowMs: 60 * 60 * 100,
  message: "Too many request! Please try again later.",
});

app.use("/notes", limiter);

// body parser
app.use(express.json({ limit: "10kb" }));

// data sanitization
app.use(mongoSanitize());
app.use(xss());

app.use(cookieParser());

// routes
app.use("/notes/api/user", userRouter);
app.use("/notes/api/user", notesRouter);
app.all("/*", notFoundContoller);

app.use(globalError);

app.listen(process.env.PORT, () => {
  console.log(`Server connected at Port: ${process.env.PORT}...`);
});
