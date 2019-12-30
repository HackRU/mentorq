import React from "react";

import { useSelector } from "react-redux";
import { Nav } from "../components/Nav";
import { TicketContainer } from "../components/TicketContainer";
import { NewTicket } from "../components/NewTicket";
import styled from "styled-components";
import DashboardConainer from "./DashboardContainer";

const DashboardInnerContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-column-gap: 16px;
  width: 64rem;
  margin: 32px auto;
`;

const Dashboard = () => {
  return (
    <DashboardConainer>
      <DashboardInnerContainer>
        <NewTicket />
        <TicketContainer />
      </DashboardInnerContainer>
    </DashboardConainer>
  );
};

export default Dashboard;
