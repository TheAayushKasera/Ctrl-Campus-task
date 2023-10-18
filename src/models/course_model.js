const mongoose = require("mongoose");

const course_Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

const course_model = mongoose.model("Courses", course_Schema);

module.exports = course_model;
