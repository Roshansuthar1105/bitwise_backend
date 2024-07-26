import dotenv from 'dotenv'
import express from 'express'
import router from './routes/authRouter.js';
import connectDB from './utils/db.js';
import cors from 'cors';
import errorMiddleware from './middlewares/errorMiddlewares.js';
dotenv.config();
const app= express();

// using cors 
const corsOption = {
    origin:"http://localhost:5173",
    methods:"POST , PUT , GET , DELETE , PATCH ,HEAD",
    credentials:true
}
app.use(cors(corsOption));

app.use(express.json());
app.use("/auth/v1/pages",router);
// app.get("/",)
const PORT = process.env.PORT ||5050;


app.use(errorMiddleware);
connectDB().then(
    app.listen(PORT,()=>{console.log(`Server is running at localhost:${PORT}`)})
).catch(()=>console.error("error during connection with mongodb"));