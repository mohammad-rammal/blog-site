const express = require("express");
const connectDB = require("./config/connectDB");
const cors = require("cors");
const { errorHandler, notFound } = require("./middlewares/error");
const xss = require("xss-clean");
const rateLimiting = require("express-rate-limit");
const hpp = require("hpp");
const helmet = require("helmet");
require("dotenv").config();

// Connection To DB
connectDB();

// Init App
const app = express();

// Middlewares
app.use(express.json());

// Prevent XSS (Cross Site Scripting) Attacks
app.use(xss());

// HPP (Prevent HTTP Param Pollution)
app.use(hpp());

// Helmet (Add More Security Headers)
app.use(helmet());

// Rate Limiting
app.use(
  rateLimiting({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100,
  })
);

// Cors Policy
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/posts", require("./routes/postRoute"));
app.use("/api/comments", require("./routes/commentRoute"));
app.use("/api/categories", require("./routes/categoryRoute"));
app.use("/api/password", require("./routes/passwordRoute"));

// Not Found Middleware
app.use(notFound);

// Error Handler Middleware
app.use(errorHandler);

// Running The Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}  ⚙️`
  )
);
