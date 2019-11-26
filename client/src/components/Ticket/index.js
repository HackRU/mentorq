/// fetch tickets and list tickets
import styled from "styled-components";
import React from "react";
import { Card } from "../Card";


const Ticket = ({ ticket: { title, comment, contact, location, status } }) => (
  <Card>
    <h1> {title}</h1>
    <h2>{comment}}</h2>
  </Card>
);

export { Ticket };
