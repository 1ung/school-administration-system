const db = require("../models");

const groupBy = (arr, property) => {
  return arr.reduce(function (memo, x) {
    if (!memo[x[property]]) {
      memo[x[property]] = [];
    }
    memo[x[property]].push(x);
    return memo;
  }, {});
};

module.exports = {
  // get all Teachers
  getTeachers: async (req, res) => {
    try {
      const allTeacher = await db.Teacher.findAll();
      if (allTeacher) {
        res.send(allTeacher);
      }
    } catch (err) {
      console.log(err);
    }
  },
  // get all TSC
  getTeacherSubjectClass: async (req, res) => {
    try {
      const allTSC = await db.TeacherSubjectClass.findAll();
      if (allTSC) {
        res.send(allTSC);
      }
    } catch (err) {
      console.log(err);
    }
  },

  // get single Teacher Workload
  getTeacherWorkload: async (req, res) => {
    const teacherWorkload = {};
    try {
      const allTSC = await db.TeacherSubjectClass.findAll();
      let _teacher = await db.Teacher.findAll({
        include: [db.Subject, db.Class],
      });

      if (_teacher && _teacher.length > 0) {
        for (let __teacher of _teacher) {
          const tsc = allTSC.filter((_tsc) => _tsc.teacherId === __teacher.id);

          if (tsc && tsc.length > 0) {
            const groupedTSC = groupBy(tsc, "subjectId");
            const groupedKeys = Object.keys(groupedTSC);
            const workloadArr = new Array();

            for (let key of groupedKeys) {
              let grouped = groupedTSC[key];
              const groupSubj = __teacher.Subjects.find(
                (subj) => subj.id === grouped[0].subjectId
              );
              let teacherObj = {
                subjectCode: groupSubj.code,
                subjectName: groupSubj.name,
                numberOfClasses: grouped.length,
              };
              workloadArr.push(teacherObj);
            }
            teacherWorkload[__teacher.name] = workloadArr;
          }
        }
        res.send(teacherWorkload);
      }
    } catch (err) {
      console.log(err);
    }
  },

  register: async (req, res) => {
    try {
      if (req.body.teacher_email) {
        if (typeof req.body.teacher_email === "string") {
          await db.Teacher.create({
            email: req.body.teacher_email,
            name: req.body.teacher_name,
          });
        } else {
          for (let i = 0; i < req.body.teacher_email.length; i++) {
            await db.Teacher.create({
              email: req.body.teacher_email[i],
              name: req.body.teacher_name[i],
            });
          }
        }
      }

      if (req.body.student_email) {
        if (typeof req.body.student_email === "string") {
          await db.Student.create({
            email: req.body.student_email,
            name: req.body.student_name,
          });
        } else {
          for (let i = 0; i < req.body.student_email.length; i++) {
            await db.Student.create({
              email: req.body.student_email[i],
              name: req.body.student_name[i],
            });
          }
        }
      }

      if (req.body.class_code) {
        if (typeof req.body.class_code === "string") {
          await db.Class.create({
            code: req.body.class_code,
            name: req.body.class_name,
          });
        } else {
          for (let i = 0; i < req.body.class_code.length; i++) {
            await db.Class.create({
              code: req.body.class_code[i],
              name: req.body.class_name[i],
            });
          }
        }
      }

      if (req.body.subject_code) {
        if (typeof req.body.subject_code === "string") {
          await db.Subject.create({
            code: req.body.subject_code,
            name: req.body.subject_name,
          });
        } else {
          for (let i = 0; i < req.body.subject_code.length; i++) {
            await db.Subject.create({
              code: req.body.subject_code[i],
              name: req.body.subject_name[i],
            });
          }
        }
      }
      res.send("Success!");
    } catch (err) {
      console.log(err);
    }
  },
  createTeacherSubjectClass: async (req, res) => {
    try {
      if (
        req.body.teacher_email &&
        req.body.subject_code &&
        req.body.class_code
      ) {
        if (typeof req.body.teacher_email === "string") {
          const allTSC = await db.TeacherSubjectClass.findAll();
          const _teacher = await db.Teacher.findAll({
            where: {
              email: req.body.teacher_email,
            },
            include: [db.Subject, db.Class],
          });
          const _subject = await db.Subject.findAll({
            where: {
              code: req.body.subject_code,
            },
          });
          const _class = await db.Class.findAll({
            where: {
              code: req.body.class_code,
            },
          });
          const tsc = allTSC.find(
            (_tsc) =>
              _tsc.teacherId === _teacher[0].id &&
              _tsc.classId === _class[0].id &&
              _tsc.subjectId === _subject[0].id
          );
          if (!tsc) {
            await db.TeacherSubjectClass.create({
              teacherId: _teacher[0].id,
              subjectId: _subject[0].id,
              classId: _class[0].id,
            });
            if (
              _teacher[0].Classes.filter(
                (_classes) => _classes.code === _class[0].code
              ).length < 1
            ) {
              await _teacher[0].addClasses([_class[0]]);
            }
            if (
              _teacher[0].Subjects.filter(
                (_subj) => _subj.code === _subject[0].code
              ).length < 1
            ) {
              await _teacher[0].addSubjects([_subject[0]]);
            }
          } else {
            console.log("Duplicate records found. Aborting create.");
            return false;
          }
        } else {
          const allTSC = await db.TeacherSubjectClass.findAll();
          const _teacher = await db.Teacher.findAll({
            include: [db.Subject, db.Class],
          });
          const _subject = await db.Subject.findAll({
            where: {
              code: req.body.subject_code,
            },
          });
          const _class = await db.Class.findAll({
            where: {
              code: req.body.class_code,
            },
          });

          for (let i = 0; i < req.body.teacher_email.length; i++) {
            const findTeacher = _teacher.find(
              (__teacher) => __teacher.email === req.body.teacher_email[i]
            );
            const tsc = allTSC.find(
              (_tsc) =>
                _tsc.teacherId === findTeacher.id &&
                _tsc.classId === _class[0].id &&
                _tsc.subjectId === _subject[0].id
            );
            if (!tsc) {
              await db.TeacherSubjectClass.create({
                teacherId: findTeacher.id,
                subjectId: _subject[0].id,
                classId: _class[0].id,
              });
              if (
                findTeacher.Classes.filter(
                  (_classes) => _classes.code === _class[0].code
                ).length < 1
              ) {
                await findTeacher.addClasses([_class[0]]);
              }
              if (
                findTeacher.Subjects.filter(
                  (_subj) => _subj.code === _subject[0].code
                ).length < 1
              ) {
                await findTeacher.addSubjects([_subject[0]]);
              }
            } else {
              console.log("Duplicate records found. Skipping create.");
              continue;
            }
          }
        }
      }

      res.send("Success!");
    } catch (err) {
      console.log(err);
    }
  },
};
