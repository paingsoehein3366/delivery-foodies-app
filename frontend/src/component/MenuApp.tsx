import { Box, Button, Card, CardContent, CardMedia, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { config } from "../comfig/comfig";

const MenuApp = () => {
    const [data, setData] = useState([{ id: "", name: "", price: "" }]);
    console.log("data", data);

    const dataFromMenus = async () => {
        const MenusResultDataFrom = await fetch(`${config.apiBaseUrl}/menus`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
        });
        const MenusResult = await MenusResultDataFrom.json()
        setData(MenusResult);
    }
    return (
        <Box>
            <Typography variant="h5">Menu rounder</Typography>
            <Button variant="contained" onClick={dataFromMenus}>Click</Button>
            {data.map((item) => {
                return (
                    <Typography key={item.id} variant="h6">{item.name}</Typography>
                )
            })}
        </Box>
    );
};
export default MenuApp;