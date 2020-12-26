const express = require("express");
const router = express.Router();
const TeacherFunc = require("../controllers/Teachers");
const StudentFunc = require("../controllers/Students");
const ClassFunc = require("../controllers/Classes");
const SubjectFunc = require("../controllers/Subjects");
const UserStoriesFunc = require("../controllers/UserStories");

// teacher router
router.get("/all-teacher", TeacherFunc.getTeachers);
router.get("/find-teacher/:id", TeacherFunc.getTeacher);
router.post("/new-teacher", TeacherFunc.createTeacher);
router.delete("/delete-teacher/:id", TeacherFunc.deleteTeacher);
router.put("/edit-teacher", TeacherFunc.editTeacher);

// student router
router.get("/all-student", StudentFunc.getStudents);
router.get("/find-student/:id", StudentFunc.getStudent);
router.post("/new-student", StudentFunc.createStudent);
router.delete("/delete-student/:id", StudentFunc.deleteStudent);
router.put("/edit-student", StudentFunc.editStudent);

// class router
router.get("/all-class", ClassFunc.getClasses);
router.get("/find-class/:id", ClassFunc.getClass);
router.post("/new-class", ClassFunc.createClass);
router.delete("/delete-class/:id", ClassFunc.deleteClass);
router.put("/edit-class", ClassFunc.editClass);

// subject router
router.get("/all-subject", SubjectFunc.getSubjects);
router.get("/find-subject/:id", SubjectFunc.getSubject);
router.post("/new-subject", SubjectFunc.createSubject);
router.delete("/delete-subject/:id", SubjectFunc.deleteSubject);
router.put("/edit-subject", SubjectFunc.editSubject);

// user stories
router.post("/register", UserStoriesFunc.register);
router.get("/all-tsc", UserStoriesFunc.getTeacherSubjectClass);
router.get("/reports/workload/", UserStoriesFunc.getTeacherWorkload);
// router.put("/add-to-teacher", UserStoriesFunc.addToTeacher);
router.post("/create-tsc", UserStoriesFunc.createTeacherSubjectClass);

module.exports = router;
