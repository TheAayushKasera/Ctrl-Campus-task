const mongoose = require("mongoose");

const student_schema = new mongoose.Schema({
  name: { type: String, required: true },
});

const student_model = mongoose.model("Students", student_schema);

module.exports = student_model;
