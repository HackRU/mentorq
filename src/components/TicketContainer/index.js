import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Ticket } from "../Ticket";
import styled from "styled-components";
import { request } from "../.././util";

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 16px;
  text: 100vw;
  word-wrap: break-word;
`;

const TicketContainer = ({ tickets = [] }) => {
  const [initFeedback, setInitFeedback] = useState([]);
  const isDirector = useSelector((store) => store.auth.director);
  const isMentor = useSelector((store) => store.auth.mentor);

  const updateFeedback = async () => {
    setInitFeedback(await request({ path: `/feedback/` }));
  };

  if (initFeedback.length == 0 && !isDirector && !isMentor) {
    updateFeedback();
  }

  return (
    <Container style={{ position: 'relative', zIndex: '2' }}>
      {tickets.map((ticket) => (
        <Ticket key={ticket.id} ticket={ticket} initFeedback={initFeedback} />
      ))}
    </Container>);
};
export { TicketContainer };
