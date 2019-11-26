/// fetch tickets and list tickets
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Ticket } from "../Ticket";
import { URL } from "../../constants";
import { refreshTokens } from "../../actions";

const TicketContainer = () => {
  // fetch the tickets in effects
  // dispatch to main . f that, local ticket state. it gets stale
  const token = useSelector(({ auth: { accessToken } }) => accessToken);
  const [tickets, setTickets] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      (async () => {
        // code: token_not_valid
        // get new token

        // get
        const data = await fetch(`${URL}/api/tickets/`, {
          headers: new Headers({ Authorization: `Bearer ${token}` })
        });

        const response = await data.json();
        const { code = "" } = response;

        switch (code) {
          case "token_not_valid":
            dispatch(refreshTokens());
            return;
          default:
            setTickets(response);
        }
      })();
    }
  }, [token]);

  return (
    <div>
      {tickets.map(ticket => (
        <Ticket ticket={ticket} />
      ))}
    </div>
  );
};

export { TicketContainer };
