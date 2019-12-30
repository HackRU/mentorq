/// fetch tickets and list tickets
import styled from "styled-components";
import React from "react";
import { Card } from "../Card";
import { Link } from "react-router-dom";

const Ticket = ({
  ticket: { id, title, comment, contact, location, status }
}) => {
  return (
    <Link to={`/ticket/${id}`}>
      <Card>
        <h1> {title}</h1>
        <h2>{comment}}</h2>
      </Card>
    </Link>
  );
};

export { Ticket };
