import  express  from "express";
import {  courses } from "../controllers/authController.js";
const coursesRouter = express.Router();
coursesRouter.route("/courses").get(courses);
// router.route("/contact").post(validate(contactSchema),contact);
export default coursesRouter ;