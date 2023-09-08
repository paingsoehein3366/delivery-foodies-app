import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { config } from "../comfig/comfig";

const RegisterApp = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        address: "",
        password: "",
    });
    const navigate = useNavigate();
    const newDataSetServer = async () => {
        const isValid = data.name && data.email && data.address && data.password;
        if (!isValid) return alert("not value");
        const resopont = await fetch(`${config.apiBaseUrl}/register`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data),
        });
        if (resopont.ok) {
            navigate("/")
        }
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 5,
        }}>
            <Typography variant="h5">Register Page</Typography>
            <TextField
                sx={{ minWidth: 300, mt: 4 }}
                label="Company Name"
                onChange={(evt) => setData({ ...data, name: evt.target.value })}
            />
            <TextField
                sx={{ minWidth: 300, mt: 4 }}
                label="Email"
                onChange={(evt) => setData({ ...data, email: evt.target.value })}
            />
            <TextField
                sx={{ minWidth: 300, mt: 4 }}
                label="Address"
                placeholder=" address / th /"
                onChange={(evt) => setData({ ...data, address: evt.target.value })}
            />
            <TextField
                sx={{ minWidth: 300, mt: 4 }}
                label="Password"
                onChange={(evt) => setData({ ...data, password: evt.target.value })}
            />
            <Button variant="contained" sx={{ marginY: 4 }} onClick={newDataSetServer}>Register</Button>
            <Link to={"/login"}>login page</Link>
        </Box>
    )
};
export default RegisterApp;