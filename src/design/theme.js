import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import 'fontsource-roboto';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: "#c85151", // red
    },
    secondary: {
      light: "#82d18f",
      main: "#4cac5c", // green
    },
    tertiary: {
      light: "#fce1a7",
      main: "#f3bb44", // yellow
      dark: "#ffad00",
    },
    textPrimary: {
      main: "black",
      dark: "#545454" // dark grey
    },
    textSecondary: {
      main: "#ededed",
    },
  },
});

export default theme;
