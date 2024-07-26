import  express  from "express";
import * as controllers from "../controllers//authController.js"
import validate from "../middlewares/validateMiddleware.js";
import {signUpSchema,loginSchema,contactSchema} from "../validations/authValidation.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();
// router.get("/",home)
// or
router.route("/").get(controllers.homePage)
router.route("/register").post(validate(signUpSchema),controllers.regPage);
router.route("/login").post(validate(loginSchema),controllers.login);
router.route("/contact").post(validate(contactSchema),controllers.contact);
router.route("/courses").get(controllers.courses);
router.route("/user").get(authMiddleware,controllers.user);
export default router;