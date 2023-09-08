import express from "express";
import { db } from "../db/db";

const menusRouter = express.Router();

menusRouter.get("/", async (req, res) => {
    const menusMenuCategoriesLocationResult = await db.query("select * from menus_menucategories_locations");
    const menuIds = menusMenuCategoriesLocationResult.rows.map((item) => item.menus_id);
    if (!menuIds) return res.send(400);
    const menusResult = await db.query("select * from menus");
    const menusResultId = menusResult.rows.filter((item) => menuIds.includes(item.id))
    if (!menusResultId) return res.send(401);

    res.send(menusResultId);
});

export default menusRouter;