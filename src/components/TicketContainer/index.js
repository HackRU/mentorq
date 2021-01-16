import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Ticket } from "../Ticket";
import { TicketList } from "../TicketList";
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
  return tickets.filter(ticket => (ticket.status === "CANCELLED" || ticket.status === "CLOSED"))
}

const getOwnClaimed = (tickets = [], email) => {
  return tickets.filter(ticket => (ticket.status === "CLAIMED" && ticket.mentor_email === email))
}

const getOtherActive = (tickets = [], email) => {
  return tickets.filter(ticket => ((ticket.status !== "CLAIMED" || ticket.mentor_email !== email) && ticket.status !== "CANCELLED"))
}

const TicketContainer = ({ tickets = [], ticketType }) => {
  const [initFeedback, setInitFeedback] = useState([]);
  const isDirector = useSelector((store) => store.auth.director);
  const isMentor = useSelector((store) => store.auth.mentor);
  const email = useSelector((store) => store.auth.email);

  useEffect(() => {
    const update = async () => {
      if (isMentor && !isDirector) {
        for (const ticket of getOwnClaimed(tickets, email)) {
          console.log(ticket);
          getSlackLink(ticket);
        }
      }
      else {
        for (const ticket of getActive(tickets)) {
          getSlackLink(ticket);
        }
      }
    };

    const interval = setInterval(update, 30000);
    update();

    return () => {
      clearInterval(interval);
    };
  }, [tickets]);

  //UPDATE ONCE CLEAR WHAT SLACK RESPONSE LOOKS LIKE
  const getSlackLink = async (ticket) => {
    var response;
    //console.log("ID: " + ticket.id);
    response = await request({
      path: `/tickets/${ticket.id}/slack-dm`,
      type: "GET",
    });
    if (ticket.status == "CLAIMED") {
      if (response != ticket.slack) {
        updateSlack(ticket, response);
      }
    }
  }

  const updateSlack = (ticket, response) => {
    if (response === "Slack ID not present within LCS for the given user(s)") {
      //console.log("User Missing Slack-ID");
      ticket.slack = "N/A";
    }
    else if (response === "Other user not found within LCS") {
      ticket.slack = "N/A";
    }
    else {
      //console.log(response);
      ticket.slack = response;
    }
  }

  const updateFeedback = async () => {
    if (tickets.filter(ticket => (ticket.feedback != "")).length > 0) {
      setInitFeedback(await request({ path: `/feedback/` }));
    }
  };

  if (initFeedback.length == 0 && !isDirector && !isMentor) {
    updateFeedback();
  }

  if (ticketType === "active") {
    return (
      < TicketList group="active" initFeedback={initFeedback} tickets={getActive(tickets)} />
    )
  }
  else if (ticketType === "closed") {
    return (
      <TicketList group="closed" initFeedback={initFeedback} tickets={getClosed(tickets)} />
    )
  }
  else if (ticketType === "my tickets") {
    return (
      <TicketList group="my tickets" initFeedback={initFeedback} tickets={getOwnClaimed(tickets, email)} />
    )
  }
  else if (ticketType === "ticket queue") {
    return (
      <TicketList group="ticket queue" initFeedback={initFeedback} tickets={getOtherActive(tickets, email)} />
    )
  }
  else {
    return (<div>No Tickets</div>)
  }
};

export { TicketContainer };
