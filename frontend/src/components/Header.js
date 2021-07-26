import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Logo from "../assets/logo-w.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "80px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header({ changeTheme }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <img src={Logo} width="90" height="72" alt="solo.io" />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={() => changeTheme()}
          ></Typography>
          <div>
            <Typography variant="overline" onClick={() => changeTheme()}>
              Change Theme
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
