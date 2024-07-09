const express = require("express");
const app = express(); 
const cors = require("cors"); 
const dotenv = require("dotenv"); 
const connectToDB = require("./database/main"); 

dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(cors());

const authRoutes = require("./routers/auth");
app.use("/auth", authRoutes);

const voteRoutes = require("./routers/vote");
app.use("/vote", voteRoutes);

const infoRoutes = require("./routers/info");
app.use("/info", infoRoutes);

const logger = require("./util/logger");
app.use(logger);

app.use(function (req, res, next) {
  console.log(
    `Request to ${req.path} using method ${
      req.method
    } at ${new Date().toUTCString()}`
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!"); 
});

app.use(function (req, res) {
  res.status(404).json({ error: "PAGE NOT FOUND" }); 
});

async function start() {
  try {
    await connectToDB(process.env.DATABASE_URL);
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1); 
  }
}

start();
