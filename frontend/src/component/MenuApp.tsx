import { Box, Button, Card, CardContent, CardMedia, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { config } from "../comfig/comfig";

const MenuApp = () => {
    const [data, setData] = useState([{ id: "", name: "", price: "" }]);
    console.log(data);

    useEffect(() => {
        dataFromMenus()
    }, [0])

    const dataFromMenus = async () => {
        const MenusResultDataFrom = await fetch(`${config.apiBaseUrl}/menus`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            },
        });
        const MenusResult = await MenusResultDataFrom.json()
        setData(MenusResult);
    };
    const Image = "https://msquarefdc.sgp1.digitaloceanspaces.com/foodie-pos/msquare/1692767780575_vietnamesFood.webp";
    return (
        <Box>
            <Typography variant="h5">Menu rounder</Typography>
            <Button variant="contained" >Click</Button>
            {data.map((item) => {
                return (
                    <Box key={item.id}>
                        <Card>
                            <CardMedia image={Image} />
                        </Card>
                        <Typography variant="h6">{item.name}</Typography>
                    </Box>
                )
            })}
        </Box>
    );
};
export default MenuApp;