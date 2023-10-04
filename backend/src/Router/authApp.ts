import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express, { Request, Response } from "express";
import { db } from "../db/db";

const authRouter = express.Router();
authRouter.post("/register", async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    console.log("name:", name, ", email:", email, ", password:", password);

    if (!name || !email || !password) return res.sendStatus(400);
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const compainesResult = await db.query("insert into companies(name) values($1) RETURNING *",
            ["McDonald's"]
        );
        const compainesId = compainesResult.rows[0].id

        const text =
            "insert into customers (name,email,password,company_id) values($1,$2,$3,$4) RETURNING *";
        const values = [name, email, hashedPassword, compainesId];
        const userResult = await db.query(text, values);
        const customers = userResult.rows[0];
        delete customers.password;

        const locationResult = await db.query(
            "insert into locations(name,company_id) values($1,$2) RETURNING *",
            ["Defult location", compainesId]
        );
        console.log(locationResult.rows);

        const locationId = locationResult.rows[0].id;
        await db.query(
            `insert into tables(name,location_id) values($1,$2) RETURNING *`,
            ["newTable", locationId]
        );
        const menusResult = await db.query(
            "insert into menus(name, price)  select * from unnest($1:: text[], $2:: int[]) returning *",
            [
                ["mote-hinn-kharr", "shan-khout-swell"],
                [500, 1000]
            ]
        );
        const menusId1 = menusResult.rows[0].id;
        const menusId2 = menusResult.rows[1].id;
        const menuCategories = await db.query(
            "insert into menu_categories(name) values('defaultMenuCategory1'),('defaultMenuCategory2') returning *"
        );
        const defaultMenuCategory = menuCategories.rows;
        const defaultMenuCategoriesId1 = defaultMenuCategory[0].id;
        const defaultMenuCategoriesId2 = defaultMenuCategory[1].id;
        await db.query(
            `insert into menus_menu_categories_locations(menus_id,menu_categories_id,location_id) 
             values(${menusId1},${defaultMenuCategoriesId1},${locationId}),(${menusId2},${defaultMenuCategoriesId2},${locationId})`
        );
        const AddonCategoriesResult = await db.query(`insert into addon_categories(name,is_required) values('Drinks',true),('Sizes',true) returning *`);
        const AddonCategories = AddonCategoriesResult.rows;
        const AddonCategoriesId1 = AddonCategories[0].id;
        const AddonCategoriesId2 = AddonCategories[1].id;
        await db.query(
            `insert into menus_addon_categories(menus_id,addon_categories_id) values(${menusId1},${AddonCategoriesId1}),(${menusId2},${AddonCategoriesId2})
         `);
        await db.query(
            `insert into addon(name,price,addon_categories_id) values('Cola',50,${AddonCategoriesId1}),('Spries',100,${AddonCategoriesId1}),
             ('Large',30,${AddonCategoriesId2}),('Medial',150,${AddonCategoriesId2})`
        );
        res.send(customers);

    } catch (err) {
        console.log("ErrorStaing", err);
        res.sendStatus(500);
    }
});

authRouter.post("/Login", async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log("email :", email, "password :", password);

    if (!email || !password) return res.sendStatus(400);
    const userResult = await db.query("select * from customers where email = $1", [email]);
    if (!userResult.rows.length) return res.sendStatus(401);
    const user = await userResult.rows[0];
    const hashedPassword = await user.password;
    delete user.password;

    const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
    if (isCorrectPassword) {
        res.send(200);
    } else {
        return res.sendStatus(401);
    }
});
export default authRouter;
