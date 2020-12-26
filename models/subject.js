"use strict";

module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define("Subject", {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Subject.associate = (models) => {
    Subject.belongsToMany(models.Teacher, {
      through: "TeacherSubject",
    });
  };
  return Subject;
};
