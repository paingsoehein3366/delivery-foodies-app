import express, { json } from "express";
import cors from "cors"
import menusRouter from "./src/Router/menusRouter";
import authRouter from "./src/Router/authApp";

const app = express();
const props = 5000;

app.use(cors())
app.use(json());
app.use("/", authRouter);
app.use("/menus", menusRouter);

app.listen(props, () => {
    console.log(`server is starting ${props}`);
});