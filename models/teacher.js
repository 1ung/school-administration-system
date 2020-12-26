"use strict";

module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define("Teacher", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Teacher.associate = (models) => {
    Teacher.belongsToMany(models.Subject, {
      through: "TeacherSubject",
    });

    Teacher.belongsToMany(models.Class, {
      through: "TeacherClass",
    });
  };

  return Teacher;
};
