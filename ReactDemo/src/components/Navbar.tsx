import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { makeStyles, createStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navlinks: {
      marginLeft: 10,
      display: "flex",
    },
    logo: {
      flexGrow: 1,
      cursor: "pointer",
    },
    link: {
      textDecoration: "none",
      color: "white",
      fontSize: "20px",
      marginLeft: 20,
      "&:hover": {
        color: "yellow",
        borderBottom: "1px solid white",
      },
    },
  })
);

function Navbar() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          VR Video Call
        </Typography>
        <div className={classes.navlinks}>
          <Link to="/" className={classes.link}>
            Home
          </Link>
          <Link to="/upload" className={classes.link}>
            Upload
          </Link>
          <Link to="/preview" className={classes.link}>
            Preview
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
