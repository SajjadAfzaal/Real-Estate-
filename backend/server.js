const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/autRoute");

const app = express();
app.use(express.json());

dotenv.config();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO;

mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/api/users", userRoute);
app.use("/auth", authRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 534;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});
