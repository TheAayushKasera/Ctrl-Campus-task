const express = require("express");
const enrollment_model = require("../models/enrollment_model");
const router = express.Router();
const { getStudent } = require("./student");
const { getCourse } = require("./course");

// Function to handle enrollment creation
const postEnrollment = async (student_id, course_id) => {
  try {
    // Check if the course exists
    const course = await getCourse(course_id);
    if (course.length === 0) {
      return `Course with id ${course_id} does not exist.`;
    }

    // Check if the student exists
    const student = await getStudent(student_id);
    if (student.length === 0) {
      return `Student with id ${student_id} does not exist.`;
    }

    const enroll = await getEnrollment(course_id);
    if (enroll.length === 0) {
      const enrollment = new enrollment_model({
        course: course_id,
        student: [student_id],
      });
      await enrollment.save();
      return `Student with id: ${student_id} enrolled in course with id: ${course_id}`;
    } else {
      const result = await enrollment_model.updateOne(
        { course: course_id },
        { $push: { student: student_id } }
      );
      return `Student with id: ${student_id} enrolled in course with id: ${course_id}`;
    }
  } catch (err) {
    console.error("Error in postEnrollment:", err);
    throw err;
  }
};

// Function to get enrollment information by course ID or all enrollments
const getEnrollment = async (course_id) => {
  try {
    if (course_id) {
      const result = await enrollment_model
        .find({ course: course_id })
        .select({ course: 0, student: 1, _id: 0 })
        .populate(["course", "student"]);
      return result;
    } else {
      const result = await enrollment_model
        .find()
        .select({ course: 1, student: 1 })
        .populate(["course", "student"]);
      return result;
    }
  } catch (err) {
    console.error("Error in getEnrollment:", err);
    throw err;
  }
};

// Endpoint to get all enrollments or enrollments for a specific course
router.get("/enrollment", async (req, res) => {
  try {
    const result = await getEnrollment();
    res.send(result);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to create a new enrollment
router.post("/enrollment", async (req, res) => {
  try {
    const student_id = req.body.student_id;
    const course_id = req.body.course_id;
    const result = await postEnrollment(student_id, course_id);
    res.send(result);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to get enrollments for a specific course
router.get("/enrollment/:course_id", async (req, res) => {
  try {
    const course_id = req.params.course_id;
    const result = await getEnrollment(course_id);
    res.send(result);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = { enrollment_router: router };
