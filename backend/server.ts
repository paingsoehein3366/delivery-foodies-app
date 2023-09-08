import express, { json } from "express";
import authApp from "./src/Router/authApp";
import cors from "cors"
import menusRouter from "./src/Router/menusRouter";

const app = express();
const props = 5000;

app.use(cors())
app.use(json());
app.use("/", authApp);
app.use("/menus", menusRouter);

app.listen(props, () => {
    console.log(`server is starting ${props}`);
});