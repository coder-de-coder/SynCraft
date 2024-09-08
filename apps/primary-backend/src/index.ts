import express from "express";
import { craftRouter } from "./router/craft";
import { userRouter } from "./router/user";

const app = express();
app.use(express.json());


app.use('/api/v1/user', userRouter);
app.use('/api/v1/craft', craftRouter);


app.listen(3000, () => {
    console.log('Primary Backend Started Sucessfully')
})