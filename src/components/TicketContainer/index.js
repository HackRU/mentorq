import React from "react";
import { Ticket } from "../Ticket";
import { TicketDropdown } from "../TicketDropdown";
import { useSelector } from "react-redux";
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

const getOwnClaimed = (tickets = [], email) => {
  return tickets.filter(ticket => (ticket.status === "CLAIMED" && ticket.mentor_email === email))
}

const getOtherActive = (tickets = [], email) => {
  return tickets.filter(ticket => ((ticket.status !== "CLAIMED" || ticket.mentor_email !== email) && ticket.status !== "CANCELLED"))
}

const TicketContainer = ({ tickets = [] }) => {
  const isDirector = useSelector((store) => store.auth.director);
  const isMentor = useSelector((store) => store.auth.mentor);
  const email = useSelector((store) => store.auth.email);

  let dropdowns

  if (isMentor && !isDirector) {
    dropdowns = <div>
      <TicketDropdown group="my tickets" defaultOpen={true} tickets={getOwnClaimed(tickets, email)} />
      <TicketDropdown group="ticket queue" defaultOpen={false} tickets={getOtherActive(tickets, email)} />
    </div>
  }
  else {
    dropdowns = <div>
      <TicketDropdown group="active" defaultOpen={true} tickets={getActive(tickets)} />
      <TicketDropdown group="closed" defaultOpen={false} tickets={getClosed(tickets)} />
    </div>
  }

  return(
    <div>
      {dropdowns}
    </div>
  )
};

export { TicketContainer };
