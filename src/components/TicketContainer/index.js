import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { TicketList } from "../TicketList";
import { request } from "../.././util";
import TicketNumbers from "../TicketNumbers";

const getCurrent = (tickets = []) => {
  return tickets.filter(ticket => (ticket.status === "OPEN" || ticket.status === "CLAIMED"))
}

const getClosed = (tickets = []) => {
  return tickets.filter(ticket => (ticket.status === "CANCELLED" || ticket.status === "CLOSED"))
}

const getOwnClaimed = (tickets = [], email) => {
  return tickets.filter(ticket => (ticket.status === "CLAIMED" && ticket.mentor_email === email))
}

const getOtherCurrent = (tickets = [], email) => {
  return tickets.filter(ticket => ((ticket.status !== "CLAIMED" || ticket.mentor_email !== email) && ticket.status !== "CANCELLED" && ticket.status !== "CLOSED"))
}

const TicketContainer = ({ tickets = [], ticketType, numOpenProp, numClaimedProp }) => {
  const [initFeedback, setInitFeedback] = useState([]);
  const isDirector = useSelector((store) => store.auth.director);
  const isMentor = useSelector((store) => store.auth.mentor);
  const email = useSelector((store) => store.auth.email);
  const [numOpen, setNumOpen] = useState(tickets.filter(ticket => (ticket.status === "OPEN")).length);
  const [numClaimed, setNumClaimed] = useState(tickets.filter(ticket => (ticket.status === "CLAIMED")).length);

  useEffect(() => {
    const update = async () => {
      if (isMentor && !isDirector) {
        for (const ticket of getOwnClaimed(tickets, email)) {
          // console.log(ticket);
          getSlackLink(ticket);
        }
      }
      else {
        for (const ticket of getCurrent(tickets)) {
          getSlackLink(ticket);
        }
      }

      if (isDirector) {
        setNumOpen(tickets.filter(ticket => (ticket.status === "OPEN")).length);
        setNumClaimed(tickets.filter(ticket => (ticket.status === "CLAIMED")).length);
      }
      else if (isMentor) {
        setNumOpen(tickets.filter(ticket => (ticket.status === "OPEN")).length);
        setNumClaimed(tickets.filter(ticket => (ticket.status === "CLAIMED" && ticket.mentor_email === email)).length);
      }
      else {
        setNumOpen(tickets.filter(ticket => (ticket.status === "OPEN" && ticket.owner_email === email)).length);
        setNumClaimed(tickets.filter(ticket => (ticket.status === "CLAIMED" && ticket.owner_email === email)).length);
      }
    };

    const interval = setInterval(update, 30000);
    update();

    return () => {
      clearInterval(interval);
    };
  }, [tickets], numOpen, numClaimed);

  //UPDATE ONCE CLEAR WHAT SLACK RESPONSE LOOKS LIKE
  const getSlackLink = async (ticket) => {
    var response;
    //console.log("ID: " + ticket.id);
    response = await request({
      path: `/tickets/${ticket.id}/slack-dm`,
      type: "GET",
    });
    if (ticket.status === "CLAIMED") {
      if (response !== ticket.slack) {
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
    if (tickets.filter(ticket => (ticket.feedback !== "")).length > 0) {
      setInitFeedback(await request({ path: `/feedback/` }));
    }
  };

  if (initFeedback.length === 0 && !isDirector && !isMentor) {
    updateFeedback();
  }

  if (ticketType === "current") {
    return (
      <div>
        < TicketList group="current" initFeedback={initFeedback} tickets={getCurrent(tickets)} />
        <TicketNumbers numClaimed={numClaimed} numOpen={numOpen} />
      </div>
    )
  }
  else if (ticketType === "closed") {
    return (
      <div>
        <TicketList group="closed" initFeedback={initFeedback} tickets={getClosed(tickets)} />
        <TicketNumbers numClaimed={numClaimed} numOpen={numOpen} />
      </div>
    )
  }
  else if (ticketType === "my tickets") {
    return (
      <div>
        <TicketList group="my tickets" initFeedback={initFeedback} tickets={getOwnClaimed(tickets, email)} />
        <TicketNumbers numClaimed={numClaimed} numOpen={numOpen} />
      </div>
    )
  }
  else if (ticketType === "ticket queue") {
    return (
      <div>
        <TicketList group="ticket queue" initFeedback={initFeedback} tickets={getOtherCurrent(tickets, email)} />
        <TicketNumbers numClaimed={numClaimed} numOpen={numOpen} />
      </div>
    )
  }
  else {
    return (<div>No Tickets</div>)
  }
};

export { TicketContainer };
