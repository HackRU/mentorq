/// fetch tickets and list tickets
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Ticket } from "../Ticket";
import { request } from "../../util";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 16px;
`;

const TicketContainer = ({ timeout = 3 }) => {
  // fetch the tickets in effects
  // dispatch to main . f that, local ticket state. it gets stale
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const update = async () => {
      setTickets(await request({ path: "/tickets/" }));
    };

    const interval = setInterval(update, timeout * 1000);
    update();

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Container>
      {tickets.map((ticket, i) => (
        <Ticket key={i} ticket={ticket} />
      ))}
    </Container>
  );
};

export { TicketContainer };
