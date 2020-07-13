import React, { useState, useEffect } from "react";
import { request } from "../util";
import { Ticket } from "../components/Ticket";
import DashboardContainer from "../components/DashboardContainer";

const TicketPage = ({
  match: {
    params: { id },
  },
}) => {
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await request({ path: `/tickets/${id}/` });
      setTicket(response);
    })();
  });

  return (
    <DashboardContainer>
      {ticket && <Ticket ticket={ticket}></Ticket>}
    </DashboardContainer>
  );
};

export default TicketPage;
