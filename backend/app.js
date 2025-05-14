const express = require("express");
const connectDB = require("./config/connectDB");
const { errorHandler, notFound } = require("./middlewares/error");
require("dotenv").config();

// Connection To DB
connectDB();

// Init App
const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/posts", require("./routes/postRoute"));
app.use("/api/comments", require("./routes/commentRoute"));
app.use("/api/categories", require("./routes/categoryRoute"));

// Not Found Middleware
app.use(notFound);

// Error Handler Middleware
app.use(errorHandler);

// Running The Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT} ⚙️`
  )
);
