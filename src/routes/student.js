const express = require("express");
const router = express.Router();
const student_model = require("../models/student_model");

// Function to get student information by ID or all students
const getStudent = async (id) => {
  try {
    if (id) {
      const result = await student_model.find({ _id: id });
      return result;
    } else {
      const result = await student_model.find();
      return result;
    }
  } catch (err) {
    console.error("Error in getStudent:", err);
    throw err;
  }
};

// Function to add a new student
const postStudent = async (name) => {
  try {
    const student = new student_model({
      name: name,
    });
    await student.save();
    return { msg: `${name} added to students` };
  } catch (err) {
    console.error("Error in postStudent:", err);
    throw err;
  }
};

// Function to update a student's name by ID
const putStudent = async (id, name) => {
  try {
    const answer = await student_model.findById(id);
    if (answer == null) {
      return { msg: `${id} not found!! please give correct id` };
    }
    await student_model.updateOne({ _id: id }, { $set: { name: name } });
    return { msg: `name updated at id: ${id}` };
  } catch (err) {
    console.error("Error in putStudent:", err);
    throw err;
  }
};

// Function to delete a student by ID
const deleteStudent = async (id) => {
  try {
    const result = await student_model.deleteOne({ _id: id });
    if (result.deletedCount == 0) {
      return `No id found with ${id} !! give correct Id`;
    } else {
      return `${id} deleted from record`;
    }
  } catch (err) {
    console.error("Error in deleteStudent:", err);
    throw err;
  }
};

// Endpoint to get all students or a specific student by ID
router.get("/student", async (req, res) => {
  try {
    const result = await getStudent(req.query.id);
    res.send(result);
  } catch (err) {
    res.status(500).send({ err: "Internal Server Error" });
  }
});

// Endpoint to update a student's name by ID
router.put("/student/", async (req, res) => {
  try {
    const id = req.query.id;
    const name = req.query.name;
    console.log(id, name);
    if (id == undefined || name == undefined || name == "" || id == "") {
      res.status(400).send("Id and name required and both must have value");
    } else {
      const result = await putStudent(id, name);
      res.send(result);
    }
  } catch (err) {
    res.status(500).send({ err: "Internal Server Error" });
  }
});

// Endpoint to add a new student
router.post("/student", async (req, res) => {
  try {
    const name = req.body.name;
    if (name == undefined) {
      res.status(400).send({ err: "Name required!!!" });
    } else {
      const result = await postStudent(name);
      res.send(result);
    }
  } catch (err) {
    res.status(500).send({ err: "Internal Server Error" });
  }
});

// Endpoint to delete a student by ID
router.delete("/student/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteStudent(id);
    res.send(result);
  } catch (err) {
    res.status(500).send({ err: "Internal Server Error" });
  }
});

module.exports = { student_router: router, getStudent };
