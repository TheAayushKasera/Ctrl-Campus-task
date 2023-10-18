const mongoose = require("mongoose");
const enrollment_Schema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Courses",
    required: true,
  },
  student: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Students",
      required: false,
    },
  ],
});

const enrollment_model = mongoose.model("enrollments", enrollment_Schema);

module.exports = enrollment_model;
