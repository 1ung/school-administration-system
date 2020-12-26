const db = require("../models");

module.exports = {
  // get all Subjects
  getSubjects: async (req, res) => {
    try {
      const allSubject = await db.Subject.findAll({
        include: [db.Teacher],
      });
      if (allSubject) {
        res.send(allSubject);
      }
    } catch (err) {
      console.log(err);
    }
  },

  // get single Subject
  getSubject: async (req, res) => {
    try {
      const _subject = await db.Subject.findAll({
        where: {
          id: req.params.id,
        },
      });
      if (_subject) {
        res.send(_subject);
      }
    } catch (err) {
      console.log(err);
    }
  },

  createSubject: async (req, res) => {
    try {
      const newSubject = await db.Subject.create({
        email: req.body.email,
        name: req.body.name,
      });
      if (newSubject) {
        res.send(newSubject);
      }
    } catch (err) {
      console.log(err);
    }
  },

  deleteSubject: async (req, res) => {
    try {
      const delSubject = await db.Subject.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (delSubject) {
        res.send("Delete Success!");
      }
    } catch (err) {
      console.log(err);
    }
  },

  // edit Subject
  editSubject: async (req, res) => {
    try {
      const updateSubject = await db.Subject.update(
        {
          name: req.body.name,
        },
        {
          where: { id: req.body.id },
        }
      );

      if (updateSubject) {
        res.send("Update Success!");
      }
    } catch (err) {
      console.log(err);
    }
  },
};
