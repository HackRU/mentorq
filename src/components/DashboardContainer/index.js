import React from "react";
import styled from "styled-components";
import { makeStyles, Container } from "@material-ui/core";

import Nav from "../Nav";

const Main = styled.div`
  background-color: #f5f8fa;
  min-height: 100vh;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "32px 0",
  },
}));

export default ({ children }) => {
  const classes = useStyles();

  return (
    <Main>
      <Nav />
      <Container maxWidth={"md"} className={classes.root}>
        {children}
      </Container>
      {/* <Stats /> */}
    </Main>
  );
};
