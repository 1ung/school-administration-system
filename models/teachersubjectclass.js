"use strict";

module.exports = (sequelize, DataTypes) => {
  const TeacherSubjectClass = sequelize.define("TeacherSubjectClass", {
    teacherId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return TeacherSubjectClass;
};
