const db = require("../models");

module.exports = {
  // get all Teachers
  getTeachers: async (req, res) => {
    try {
      const allTeacher = await db.Teacher.findAll({
        include: [db.Subject, db.Class],
      });
      if (allTeacher) {
        res.send(allTeacher);
      }
    } catch (err) {
      console.log(err);
    }
  },

  // get single Teacher
  getTeacher: async (req, res) => {
    try {
      const _teacher = await db.Teacher.findAll({
        where: {
          id: req.params.id,
        },
      });
      if (_teacher) {
        res.send(_teacher);
      }
    } catch (err) {
      console.log(err);
    }
  },

  createTeacher: async (req, res) => {
    try {
      const newTeacher = await db.Teacher.create({
        email: req.body.email,
        name: req.body.name,
      });
      if (newTeacher) {
        res.send(newTeacher);
      }
    } catch (err) {
      console.log(err);
    }
  },

  deleteTeacher: async (req, res) => {
    try {
      const delTeacher = await db.Teacher.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (delTeacher) {
        res.send("Delete Success!");
      }
    } catch (err) {
      console.log(err);
    }
  },

  // edit Teacher
  editTeacher: async (req, res) => {
    try {
      const updateTeacher = await db.Teacher.update(
        {
          name: req.body.name,
        },
        {
          where: { id: req.body.id },
        }
      );

      if (updateTeacher) {
        res.send("Update Success!");
      }
    } catch (err) {
      console.log(err);
    }
  },
};
