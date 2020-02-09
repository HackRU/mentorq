import React, { useState, useEffect } from "react";
import DashboardConainer from "./DashboardContainer";
import { request } from "../util";
import { Ticket } from "../components/Ticket";

const TicketPage = ({
  match: {
    params: { id }
  }
}) => {
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await request(`/tickets/${id}`);

      setTicket(response);
    })();
  });

  return (
    <DashboardConainer>
      {ticket && <Ticket ticket={ticket}></Ticket>}
    </DashboardConainer>
  );
};

export default TicketPage;
