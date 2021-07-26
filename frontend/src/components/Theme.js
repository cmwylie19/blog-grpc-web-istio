import React from "react";
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { lightGreen, grey } from "@material-ui/core/colors";

export const darkTheme = createMuiTheme({
  typography: {
    fontFamily: "Red Hat Text, sans-serif",
  },
  palette: {
    primary: { main: "#000", contrastText: "#fbfbfb" },
    secondary: { main: lightGreen[500] },
    type: "light",
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },

  MuiButton: {
    // Name of the rule
    text: {
      // Some CSS
      color: lightGreen,
    },
  },
  MuiCssBaseline: {
    "@global": {
      "@font-face": `'Red Hat Display', sans-serif;`,
    },
  },
  MuiStepIcon: {
    root: {
      "&$active": {
        fill: lightGreen,
        "& $text": {
          fill: lightGreen,
        },
      },
    },
    text: {
      fill: lightGreen,
    },
  },
});

export const lightTheme = createMuiTheme({
  typography: {
    fontFamily: "Red Hat Text, sans-serif",
  },
  palette: {
    primary: { main: grey[700], contrastText: "#fbfbfb" },
    secondary: { main: lightGreen[500] },
    type: "light",
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },

  MuiButton: {
    // Name of the rule
    text: {
      // Some CSS
      color: lightGreen,
    },
  },
  MuiCssBaseline: {
    "@global": {
      "@font-face": `'Red Hat Display', sans-serif;`,
    },
  },
  MuiStepIcon: {
    root: {
      "&$active": {
        fill: lightGreen,
        "& $text": {
          fill: lightGreen,
        },
      },
    },
    text: {
      fill: lightGreen,
    },
  },
});
export default function ThemeContainer({ children, theme }) {
  let responsiveTheme = responsiveFontSizes(theme);
  return (
    <ThemeProvider theme={responsiveTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
