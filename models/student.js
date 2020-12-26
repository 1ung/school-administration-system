"use strict";

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("Student", {
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

  Student.associate = (models) => {
    Student.belongsToMany(models.Class, {
      through: "StudentClass",
    });
  };
  return Student;
};
