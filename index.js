const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// API routes
app.use("/api", require("./routes/cryptoRoutes"));

// Default route for root path
app.use('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

// Error handling middleware
app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(500).json({ message: error.message || "Something went wrong" });
  });

// Set the port from environment variables or use 8000 as default
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });