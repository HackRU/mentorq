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
      main: "#1f6aa0", // red
    },
    secondary: {
      light: "#003366",
      main: "#003366", // green
    },
    tertiary: {
      light: "#fce1a7",
      main: "#f3bb44", // yellow
      dark: "#ffad00",
    },
    textPrimary: {
      main: "#545454",
      dark: "#545454" // dark grey
    },
    textSecondary: {
      main: "#ededed",
    },
  },
});

export default theme;
