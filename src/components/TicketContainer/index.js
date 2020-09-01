import React from "react";
import { Ticket } from "../Ticket";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 16px;
  text: 100vw;
  word-wrap: break-word;
`;

const sortByTimeOpen = (tickets = []) => {
  //tickets.map(a => console.log(new Date (a.created_datetime).valueOf()))
  // owner_email
  tickets.sort((a, b) => new Date(b.created_datetime).valueOf() - new Date(a.created_datetime).valueOf())
}

const TicketContainer = ({ tickets = [] }) => (
  <Container style={{ position: 'relative', zIndex: '2' }}>
    {sortByTimeOpen(tickets)}
    {tickets.map((ticket) => (
      <Ticket key={ticket.id} ticket={ticket} />
    ))}
  </Container>
);

export { TicketContainer };
