import express from "express";
import { craftRouter } from "./router/craft";
import { userRouter } from "./router/user";
import { triggerRouter } from "./router/trigger";
import { actionRouter } from "./router/action";
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/v1/user', userRouter);
app.use('/api/v1/craft', craftRouter);
app.use("/api/v1/trigger", triggerRouter);
app.use("/api/v1/action", actionRouter);


app.listen(3000, () => {
    console.log('Primary Backend Started Sucessfully')
})