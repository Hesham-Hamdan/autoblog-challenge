const express = require("express");
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes/routes");
const { startScheduler, checkAndSeedData } = require("./services/articleJob");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", routes);

// Health Check (For AWS/Docker health checks)
app.get("/", (req, res) => {
  res.send("Blog Backend is running");
});

// Start Server
app.listen(PORT, async () => {
  console.log(`[SERVER] Running on port ${PORT}`);

  // Initialize Scheduled Jobs
  startScheduler();

  // Check DB and Seed if necessary
  await checkAndSeedData();
});
