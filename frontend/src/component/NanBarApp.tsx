import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import CategoryIcon from '@mui/icons-material/Category';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import ClassIcon from '@mui/icons-material/Class';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';

const NanBar = () => {
    const [open, setOpen] = useState(false);

    const sidebarMenuItems = [
        { id: 1, label: "Orders", icon: <LocalMallIcon />, route: "/orders" },
        { id: 2, label: "Menus", icon: <LocalDiningIcon />, route: "/menus" },
        {
            id: 3,
            label: "Menu Categories",
            icon: <CategoryIcon />,
            route: "/menu-categories",
        },
        { id: 4, label: "Addons", icon: <LunchDiningIcon />, route: "/addons" },
        {
            id: 5,
            label: "Addon Categories",
            icon: <ClassIcon />,
            route: "/addon-categories",
        },
        {
            id: 6,
            label: "Tables",
            icon: < TableRestaurantIcon />,
            route: "/Tables",
        },
        {
            id: 7,
            label: "Locations",
            icon: <LocationOnIcon />,
            route: "/locations",
        },
        { id: 7, label: "Settings", icon: <SettingsIcon />, route: "/settings" },
    ];

    const list = () => (
        <Box
            role="presentation"
            onClick={() => { setOpen(false) }}
            onKeyDown={() => { setOpen(false) }}
            sx={{ mt: 5 }}
        >
            <List>
                {sidebarMenuItems.slice(0, 7).map((menuItem) => (
                    <Link
                        to={menuItem.route}
                        key={menuItem.id}
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                                <ListItemText primary={menuItem.label} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Divider />
            <List>
                {sidebarMenuItems.slice(-1).map((menuItem) => (
                    <Link
                        to={menuItem.route}
                        key={menuItem.id}
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {menuItem.icon}
                                </ListItemIcon>
                                <ListItemText primary={menuItem.label} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Box>
    )

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar position="static">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" >
                        Delivery-Foodies-App
                    </Typography>

                    <Button color="inherit">
                        <Link to={"/login"} style={{ textDecoration: "none", color: "inherit" }}>
                            Login
                        </Link>
                    </Button>
                    <Drawer
                        open={open} onClose={() => {
                            setOpen(false);
                        }}>
                        <h1 style={{ backgroundColor: "#ADD8E6", height: "100%", margin: "0px", padding: "0px" }}>{list()}</h1>
                    </Drawer>
                </Toolbar>
            </AppBar>
        </Box >
    );
}
export default NanBar;