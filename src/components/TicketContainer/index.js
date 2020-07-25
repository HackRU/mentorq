import React from "react";
import { Ticket } from "../Ticket";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 16px;
`;

const TicketContainer = ({ tickets = [] }) => (
  <Container>
    {tickets.map((ticket) => (
      <Ticket key={ticket.id} ticket={ticket} />
    ))}
  </Container>
);

export { TicketContainer };
 