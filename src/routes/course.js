const express = require("express");
const router = express.Router();
const course_model = require("../models/course_model");
const enrollment_model = require("../models/enrollment_model");

// Function to get course information by ID or all courses
const getCourse = async (id) => {
  try {
    if (id) {
      const result = await course_model.find({ _id: id });
      return result;
    } else {
      const result = await course_model.find();
      return result;
    }
  } catch (err) {
    console.error("Error in getCourse:", err);
    throw err; // Re-throw the error for centralized error handling
  }
};

// Function to add a new course
const postCourse = async (title) => {
  try {
    const course = new course_model({
      title: title,
    });
    const savedCourse = await course.save();
    const course_id = savedCourse._id;
    const enrollment = new enrollment_model({
      course: course_id,
      student: [],
    });
    await enrollment.save();
    return `${title} added to Courses`;
  } catch (err) {
    console.error("Error in postCourse:", err);
    throw err;
  }
};

// Function to update a course's title by ID
const putCourse = async (id, title) => {
  try {
    const answer = await course_model.findById(id);
    if (answer == null) {
      return `${id} not found!! please give correct id`;
    }
    await course_model.updateOne({ _id: id }, { $set: { title: title } });
    return `Title updated at id: ${id}`;
  } catch (err) {
    console.error("Error in putCourse:", err);
    throw err;
  }
};

// Function to delete a course by ID
const deleteCourse = async (id) => {
  try {
    // Check if the course exists
    const course = await getCourse(id);
    if (!course) {
      return `Course with id ${id} does not exist.`;
    }

    // Delete the associated enrollments
    await enrollment_model.deleteMany({ course: id });

    const result = await course_model.deleteOne({ _id: id });
    return `Course with id ${id} deleted from record along with associated enrollments.`;
  } catch (err) {
    console.error("Error in deleteCourse:", err);
    throw err;
  }
};

// Endpoint to get all courses or a specific course by ID
router.get("/course", async (req, res) => {
  try {
    const result = await getCourse(req.query.id);
    res.send(result);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to add a new course
router.post("/course", async (req, res) => {
  try {
    const title = req.body.title;
    if (title == undefined || title == "") {
      res.status(400).send("Title required!!!");
    } else {
      const result = await postCourse(title);
      res.send(result);
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to update a course's title by ID
router.put("/course", async (req, res) => {
  try {
    const id = req.query.id;
    const title = req.query.title;
    if (id == undefined || title == undefined || title == "" || id == "") {
      res.status(400).send("Id and title required and both must have value");
    } else {
      const result = await putCourse(id, title);
      res.send(result);
    }
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

// Endpoint to delete a course by ID
router.delete("/course/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteCourse(id);
    res.send(result);
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = { course_router: router, getCourse };
