import React from "react";
import styled from "styled-components";
import { makeStyles, Container, Paper } from "@material-ui/core";

import Nav from "../Nav";

const Main = styled.div`
  background-color: #f5f8fa;
  min-height: 100vh;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "32px 0",
  },
  paper: {
    position: "relative",
    zIndex: 1,
    height: "100%",
    minHeight: "100vh",
    padding: theme.spacing(4),
    backgroundColor: theme.palette.primary.main,
    boxShadow: "0px 2px 5px 0px",
  },
}));

export default ({ children }) => {
  const classes = useStyles();

  return (
    <Main>
      <Nav />
      <Container maxWidth={"md"} className={classes.root}>
        <Paper className={classes.paper}>{children}</Paper>
      </Container>
    </Main>
  );
};
