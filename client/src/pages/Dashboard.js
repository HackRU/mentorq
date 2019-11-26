import React from "react";

import { useSelector } from "react-redux";
import { Nav } from "../components/Nav";
import { TicketContainer } from "../components/TicketContainer";
import { NewTicket } from "../components/NewTicket";
import styled from "styled-components";

const DashboardContainer = styled.div`
  background-color: #f5f8fa;
  min-height: 100vh;
`;

const DashboardInnerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 16px;
  width: 64rem;
  margin: 32px auto;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Nav />
      <DashboardInnerContainer>
        <NewTicket />
        <TicketContainer />
      </DashboardInnerContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
