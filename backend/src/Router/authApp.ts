import dotenv from "dotenv";
dotenv.config();
import { config } from "../comfig/comfig";
import jwt from "jsonwebtoken";
import express from "express";
import { db } from "../db/db";

const authApp = express.Router();

authApp.post("/register", async (req, res) => {
    const { name, email, address, password } = req.body;
    const isValid = name && email && address && password;
    if (!isValid) return res.send(400);
    const userEmailCheck = await db.query(`select * from users where email = $1`, [email]);
    if (userEmailCheck) return res.send(500)
    const userResult = await db.query("insert into users (name,email,password) values($1,$2,$3) returning *", [
        name, email, password
    ]);
    if (!userResult.rows.length) return res.send(401)
    console.log("users", userResult.rows[0]);

    const userId = userResult.rows.map((item) => item.id);
    const locationResult = await db.query("insert into locations (name,userid) values($1,$2) returning *", [
        address, Number(userId)
    ]);
    const locationId = locationResult.rows[0].id;

    const menusResult = await db.query("insert into menus(name,price) values($1,$2) returning *", ["default value", Number("2000")]);
    const menuId = await menusResult.rows[0].id;
    if (!menusResult.rows.length) return res.send(401);

    const menuCategoriesResult = await db.query("insert into menucategories(name) values($1) returning *", ["default value"]);
    if (!menuCategoriesResult.rows.length) return res.send(402);
    const menuCategoriesId = menuCategoriesResult.rows[0].id;

    await db.query("insert into menus_menucategories_locations (menus_id,menucategories_id,locations_id) values($1,$2,$3) returning *", [
        menuId, menuCategoriesId, locationId
    ]);
    res.send(200);
});

authApp.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const isValid = email && password;
    if (!isValid) return res.send(400);
    const userResult = await db.query(`select * from users where email = $1`, [email]);
    if (!userResult.rows.length) return res.send(401);
    const userHasCheckEmail = userResult.rows[0];
    console.log("userHasCheckEmail", userHasCheckEmail);

    const checkPassword = userHasCheckEmail.password;
    if (checkPassword === password) {
        const accessToken = jwt.sign(userHasCheckEmail, config.jwtSecret);
        console.log("accessToken", accessToken);
        return res.send({ accessToken })
    } else {
        res.send(403)
    }
});
export default authApp;