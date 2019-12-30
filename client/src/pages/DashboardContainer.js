import React from "react";

import { Nav } from "../components/Nav";
import styled from "styled-components";

const Container = styled.div`
  background-color: #f5f8fa;
  min-height: 100vh;
`;

const DashboardConainer = ({ children }) => {
  return (
    <Container>
      <Nav />
      {children}
    </Container>
  );
};

export default DashboardConainer;
