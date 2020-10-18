import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Ticket } from "../Ticket";
import { TicketDropdown } from "../TicketDropdown";
import styled from "styled-components";
import { request } from "../.././util";

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
  const [initFeedback, setInitFeedback] = useState([]);
  const isDirector = useSelector((store) => store.auth.director);
  const isMentor = useSelector((store) => store.auth.mentor);
  const email = useSelector((store) => store.auth.email);

  const updateFeedback = async () => {
    setInitFeedback(await request({ path: `/feedback/` }));
  };

  if (initFeedback.length == 0 && !isDirector && !isMentor) {
    updateFeedback();
  }

  let dropdowns

  if (isMentor && !isDirector) {
    dropdowns = <div>
      <TicketDropdown group="my tickets" defaultOpen={true} initFeedback={initFeedback} tickets={getOwnClaimed(tickets, email)} />
      <TicketDropdown group="ticket queue" defaultOpen={false} initFeedback={initFeedback} tickets={getOtherActive(tickets, email)} />
    </div>
  }
  else {
    dropdowns = <div>
      <TicketDropdown group="active" defaultOpen={true} initFeedback={initFeedback} tickets={getActive(tickets)} />
      <TicketDropdown group="closed" defaultOpen={false} initFeedback={initFeedback} tickets={getClosed(tickets)} />
    </div>
  }

  return(
    <div>
      {dropdowns}
    </div>
  )
};

export { TicketContainer };
