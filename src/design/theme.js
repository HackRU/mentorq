import React from 'react';
import { createMuiTheme } from "@material-ui/core/styles";

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
            main: '#c85151',
        },
        secondary: {
            main: '#4cac5c',
        },
        tertiary: {
            main: "#f3bb44",
        }
    }
});

export default theme;