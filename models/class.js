"use strict";

module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define("Class", {
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

  Class.associate = (models) => {
    Class.belongsToMany(models.Teacher, {
      through: "TeacherClass",
    });

    Class.belongsToMany(models.Student, {
      through: "StudentClass",
    });
  };

  return Class;
};
