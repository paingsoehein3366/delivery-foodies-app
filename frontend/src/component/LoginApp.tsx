import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginApp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({ email: "", password: "" });
    const navigate = useNavigate()
    console.log("data", data);


    const dataSetServer = async () => {
        const isValid = data.email && data.password
        if (!isValid) return alert("not email and password");
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data),
        });
        if (response.ok) {
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
            <Typography variant="h5">Login Page</Typography>
            <TextField
                sx={{ minWidth: 300, mt: 4 }}
                label="Email"
                onChange={(evt) => setData({ ...data, email: evt.target.value })} />
            <Box sx={{ mt: 4, display: "flex", width: 300, }}>
                <input type="checkbox" onClick={() => {
                    if (showPassword) {
                        setShowPassword(false)
                    } else {
                        setShowPassword(true)
                    }

                }} />
                <span>show password</span>
            </Box>
            <TextField
                type={showPassword ? "text" : "password"}
                sx={{ minWidth: 300, mt: 2 }}
                label="Password"
                onChange={(evt) => setData({ ...data, password: evt.target.value })}
            />
            <Button variant="contained" sx={{ marginY: 4 }} onClick={dataSetServer}>Login</Button>
            <Link to={"/register"}>register page</Link>
        </Box>
    )
};
export default LoginApp;