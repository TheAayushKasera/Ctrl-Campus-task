const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const { student_router } = require("./routes/student");
const { course_router } = require("./routes/course");
const { enrollment_router } = require("./routes/enrollment");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 8000;

// MongoDB connection URI
const uri = `mongodb+srv://${process.env.user}:${process.env.pass}@cluster0.zyeydr6.mongodb.net/?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connection established with Mongoose");
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(student_router);
app.use(course_router);
app.use(enrollment_router);
app.use(cors());

// Endpoint to test if the server is running
app.get("/", (req, res) => {
  res.sendFile("documentation.html", { root: __dirname });
});

// Catch-all route for unknown routes
app.get("*", (req, res) => {
  res.status(404).send("404 Not Found");
  res.sendFile("documentation.html", { root: __dirname });
});

// Start the server
app.listen(port, () => {
  console.log("Server is listening on port", port);
});
