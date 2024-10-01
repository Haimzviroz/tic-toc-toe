import express, { Application } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes"

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use("/users", userRouter)


const PORT: string = process.env.PORT || "3004";

app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});