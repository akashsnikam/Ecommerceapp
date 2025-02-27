const path = require("path");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes");

const app = express();

const _dirname = path.resolve();

app.use(express.json({ limit: "10mb" })); // Increased JSON limit
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

app.use(express.static(path.join(_dirname, "/CS-E-Comerce/dist")));
app.get("*", (_, res) => {
  res.sendFile(path.resolve(_dirname, "CS-E-Comerce", "dist", "index.html"));
});

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to DB");
    console.log(`Server is running on port ${PORT}`);
  });
});
