import React, { useState } from "react";
import { Input } from "../Input";
import { Card } from "../Card";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { createTicket } from "../../actions";

const options = {
  OPEN: "Open",
  CLOSED: "Closed",
  CLAIMED: "Claimed",
  CANCELLED: "Cancelled"
};

const Select = styled.select`
  width: 100%;
  height: 48px;
  display: block;
`;

const Button = styled.input.attrs(props => ({
  type: "submit"
}))`
  margin-top: 8px;
  appearance: none;
  background-color: orange;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  color: white;
  width: 100%;
  height: 48px;
  border: none;
`;

const NewTicket = () => {
  const dispatch = useDispatch();
  const [ticket, setTicket] = useState({
    title: "",
    titleError: "",
    comment: "",
    commentError: "",
    contact: "",
    contactError: "",
    location: "",
    locationError: ""
  });
  //	“owner_email”: “...”,

  const onSubmit = e => {
    e.preventDefault();

    if (
      ticket.title &&
      ticket.comment &&
      ticket.contact &&
      ticket.location
    ) {
      dispatch(
        createTicket({
          status: ticket.status,
          title: ticket.title,
          comment: ticket.comment,
          contact: ticket.contact,
          location: ticket.location
        })
      );
    }
  };

  return (
    <Card>
      <form onSubmit={onSubmit}>
        <label>Contact</label>
        <Input
          onChange={e => setTicket({ ...ticket, contact: e.target.value })}
          value={ticket.contact}
        />

        <label>Title</label>
        <Input
          onChange={e => setTicket({ ...ticket, title: e.target.value })}
          value={ticket.title}
        />

        <label>Comment</label>
        <Input
          onChange={e => setTicket({ ...ticket, comment: e.target.value })}
          value={ticket.comment}
        />

        <label>Location</label>
        <Input
          onChange={e => setTicket({ ...ticket, location: e.target.value })}
          value={ticket.location}
        />

        <Button />
      </form>
    </Card>
  );
};

export { NewTicket };
