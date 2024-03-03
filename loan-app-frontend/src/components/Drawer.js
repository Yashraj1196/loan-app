import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DrawerMui from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Drawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    const isLoggedInUser = localStorage.getItem("isLoggedInUser");
    const isLoggedInAdmin = localStorage.getItem("isLoggedInAdmin");

    if (isLoggedInUser === "true" || isLoggedInAdmin === "true") {
      localStorage.setItem("isLoggedInUser", "false");
      localStorage.setItem("isLoggedInAdmin", "false");
      window.location.href = "/";
      enqueueSnackbar("Logged out successfully.", { variant: "success" });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Loan App
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <DrawerMui anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          {[
            {
              text: "All Requests",
              icon: <InboxIcon />,
              path: "/userDashboard",
            },
            {
              text: "Request For Loan",
              icon: <MailIcon />,
              path: "/userDashboard/request-for-loan",
            },
            {
              text: "Repayments",
              icon: <MailIcon />,
              path: "/userDashboard/repayments",
            },
          ].map(({ text, icon, path }, index) => (
            <ListItem key={text}>
              <ListItemButton
                component={Link}
                to={path}
                onClick={handleDrawerClose}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DrawerMui>
    </Box>
  );
};

export default Drawer;
