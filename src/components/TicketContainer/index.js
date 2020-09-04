import React from "react";
import { Ticket } from "../Ticket";
import { TicketDropdown } from "../TicketDropdown";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 16px;
  text: 100vw;
  word-wrap: break-word;
`;

const getActive = (tickets = []) => {
  return tickets.filter(ticket => (ticket.status === "OPEN" || ticket.status === "CLAIMED"))
}

const getClosed = (tickets = []) => {
  return tickets.filter(ticket => (ticket.status === "CANCELED" || ticket.status === "CLOSED"))
}

const TicketContainer = ({ tickets = [] }) => (
  <div>
    <TicketDropdown group="active" tickets={getActive(tickets)} />
    <TicketDropdown group="closed" tickets={getClosed(tickets)} />
  </div>
  /*<Container style={{ position: 'relative', zIndex: '2' }}>
    {sortByTimeOpen(tickets)}
    {tickets.map((ticket) => (
      <Ticket key={ticket.id} ticket={ticket} />
    ))}
  </Container>*/
);

export { TicketContainer };
