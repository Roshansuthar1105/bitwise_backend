import dotenv from 'dotenv'
import express from 'express'
import router from './routes/authRouter.js';
import contactRouter from './routes/contactRoute.js';
import coursesRouter from './routes/coursesRoute.js'
import connectDB from './utils/db.js';
import cors from 'cors';
import errorMiddleware from './middlewares/errorMiddlewares.js';
import userRouter from './routes/userRoute.js'; 
dotenv.config();
const app= express();

// using cors 
const corsOption = {
    origin:"http://localhost:5173",
    methods:"POST , PUT , GET , DELETE , PATCH ,HEAD",
    credentials:true
}
app.use(cors(corsOption));
// https://bitwise-backend.onrender.com/api/v1/auth/login
app.use(express.json());
app.use("api/v1/auth/",router);
app.use("/contact",contactRouter);
app.use("/user",userRouter);
app.use("api/v1/courses",coursesRouter);
// app.get("/",)
const PORT = process.env.PORT ||5050;


app.use(errorMiddleware);
connectDB().then(
    app.listen(PORT,()=>{console.log(`Server is running at localhost:${PORT}`)})
).catch(()=>console.error("error during connection with mongodb"));