/// fetch tickets and list tickets
import styled from "styled-components";
import React from "react";
import { Card } from "../Card";
import { Link } from "react-router-dom";
import Label from "../Label";

const GridTable = styled.div`
  display: grid;
  grid-auto-flow: column;
`;

const Ticket = ({
  ticket: { id, title, comment, contact, location, status }
}) => {
  return (
    <Link to={`/ticket/${id}`}>
      <Card>
        <h1>{title}</h1>
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
      </Card>
    </Link>
  );
};

export { Ticket };
