const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");

// dotenv configuration
dotenv.config();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// static files access
app.use(express.static(path.join(__dirname, "./client/build")));

// routes
app.use("/api/v1/portfolio", require("./routes/portfolioRoute"));

// serve React app
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// port
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
