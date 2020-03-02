/// fetch tickets and list tickets
import styled from "styled-components";
import React from "react";
import { Card } from "../Card";
import { Link } from "react-router-dom";
import Label from "../Label";
import { request } from "../.././util";

const GridTable = styled.div`
  display: grid;
  grid-auto-flow: column;
`;

const Ticket = ({
  ticket: { id, title, comment, contact, location, status }
}) => {
  const claimTicket = async () => {
    await request({
      path: `/tickets/${id}/`,
      type: "PATCH",
      body: {
        status: "CLAIMED"
      }
    });
  };

  const closeTicket = async () => {
    await request({
      path: `/tickets/${id}/`,
      type: "PATCH",
      body: {
        status: "CLOSED"
      }
    });
  };

  return (
    <Card>
      <Link to={`/ticket/${id}`}>
        <h1>{title}</h1>
      </Link>
      <GridTable>
        <div>
          <Label>Comment</Label>
          <p>{comment}</p>
        </div>
        <div>
          <Label>Contact</Label>
          <p>{contact}</p>
        </div>
        <div>
          <Label>Location</Label>
          <p>{location}</p>
        </div>
        <div>
          <Label>Status</Label>
          <p>{status}</p>
        </div>
      </GridTable>

      <div>
        <button onClick={claimTicket}>claim</button>
        <button onClick={closeTicket}>close</button>
      </div>
    </Card>
  );
};

export { Ticket };
