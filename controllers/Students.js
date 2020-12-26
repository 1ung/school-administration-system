const db = require("../models");

module.exports = {
  // get all Students
  getStudents: async (req, res) => {
    try {
      const allStudent = await db.Student.findAll();
      if (allStudent) {
        res.send(allStudent);
      }
    } catch (err) {
      console.log(err);
    }
  },

  // get single Student
  getStudent: async (req, res) => {
    try {
      const _student = await db.Student.findAll({
        where: {
          id: req.params.id,
        },
      });
      if (_student) {
        res.send(_student);
      }
    } catch (err) {
      console.log(err);
    }
  },

  createStudent: async (req, res) => {
    try {
      const newStudent = await db.Student.create({
        email: req.body.email,
        name: req.body.name,
      });
      if (newStudent) {
        res.send(newStudent);
      }
    } catch (err) {
      console.log(err);
    }
  },

  deleteStudent: async (req, res) => {
    try {
      const delStudent = await db.Student.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (delStudent) {
        res.send("Delete Success!");
      }
    } catch (err) {
      console.log(err);
    }
  },

  // edit Student
  editStudent: async (req, res) => {
    try {
      const updateStudent = await db.Student.update(
        {
          name: req.body.name,
        },
        {
          where: { id: req.body.id },
        }
      );

      if (updateStudent) {
        res.send("Update Success!");
      }
    } catch (err) {
      console.log(err);
    }
  },
};
