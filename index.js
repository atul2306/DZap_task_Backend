const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());


app.use("/api", require("./routes/cryptoRoutes"));
app.use('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(500).json({ message: error.message || "Something went wrong" });
  });

const PORT = process.env.PORT || 8000;


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });