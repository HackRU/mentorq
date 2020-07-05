import React from "react";

import { Nav } from "../components/Nav";
import styled from "styled-components";

const Container = styled.div`
  background-color: #f5f8fa;
  min-height: 100vh;
`;

const InnerContainer = styled.div`
  width: 64rem;
  margin: 0 auto;
  padding: 32px 0;
`;

const DashboardConainer = ({ children }) => {
  return (
    <Container>
      <Nav />
      <InnerContainer>{children}</InnerContainer>
    </Container>
  );
};

export default DashboardConainer;