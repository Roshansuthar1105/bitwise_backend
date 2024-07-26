import User from "../models/userSchema.js";
import Feedback from "../models/feedbackSchema.js";
import Course from "../models/courseSchema.js";
import bcryptjs from "bcryptjs";
const homePage = async (req, res) => {
  try {
    res.status(202).send("this is home page from controller");
  } catch (error) {
    res.status(404).send({ message: error });
  }
};
const regPage = async (req, res) => {
  try {
    // console.log(req.body)
    const { email, password, phone, username } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).send({ msg: "Email already exist" });
    }
    const userCreated = await User.create({ email, password, phone, username });
    res.status(201).json({
      msg: userCreated,
      userId: userCreated._id.toString(),
      token: await userCreated.generateToken(),
    });
  } catch (error) {
    res.status(400).send({ message: "Error" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).send({ message: "invalid Credentions" });
    }
    // const isCorrectPassword =await bcryptjs.compare(password,userExist.password);
    const isCorrectPassword = await userExist.compairPassword(password);
    if (isCorrectPassword) {
      res.status(201).send({
        message: "logged In Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      return res.status(400).send({ message: "invalid Credentions" });
    }
  } catch (error) {
    res.status(500).send({ message: "internal server error" });
  }
};
const contact = async (req, res) => {
  try {
    const { email, message, username } = req.body;
    const userExist = await User.findOne({ email: email });
    if (!userExist) {
      return res.status(400).send({ msg: "user not found Sign Up now" });
    }
    const newMessage = await Feedback.create({ email, username, message });
    res.status(201).json({
      msg: newMessage,
      userId: newMessage._id.toString(),
      // token: await userCreated.generateToken(),
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error", err: error });
  }
};
const user = async (req,res)=>{
  try {
    const user = req.user;
    console.log("user -> userdata",user);
    return res.status(200).json({user});
  } catch (error) {
    res.status(400).send({ message: "Error", error });
  }
}
const courses = async(req,res)=>{
  try {
    const response = await Course.find({});
    if(!response){
      return res.status(400).send(`courses page error ${error}`);
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(400).send(`courses page error ${error}`);
  }
}
export { homePage, regPage, login, contact , user ,courses };
