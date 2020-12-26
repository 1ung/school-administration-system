const db = require("../models");

module.exports = {
  // get all Classs
  getClasses: async (req, res) => {
    try {
      const allClass = await db.Class.findAll({
        include: [db.Teacher],
      });
      if (allClass) {
        res.send(allClass);
      }
    } catch (err) {
      console.log(err);
    }
  },

  // get single Class
  getClass: async (req, res) => {
    try {
      const _class = await db.Class.findAll({
        where: {
          id: req.params.id,
        },
      });
      if (_class) {
        res.send(_class);
      }
    } catch (err) {
      console.log(err);
    }
  },

  createClass: async (req, res) => {
    try {
      const newClass = await db.Class.create({
        email: req.body.email,
        name: req.body.name,
      });
      if (newClass) {
        res.send(newClass);
      }
    } catch (err) {
      console.log(err);
    }
  },

  deleteClass: async (req, res) => {
    try {
      const delClass = await db.Class.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (delClass) {
        res.send("Delete Success!");
      }
    } catch (err) {
      console.log(err);
    }
  },

  // edit Class
  editClass: async (req, res) => {
    try {
      const updateClass = await db.Class.update(
        {
          code: req.body.code,
          name: req.body.name,
          teacherId: req.body.teacherId,
        },
        {
          where: { id: req.body.id },
        }
      );

      if (updateClass) {
        res.send("Update Success!");
      }
    } catch (err) {
      console.log(err);
    }
  },
};
