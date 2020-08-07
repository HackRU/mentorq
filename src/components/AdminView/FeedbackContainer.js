import React from "react";
import { FeedbackCard } from "./FeedbackCard";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 16px;
`;

const FeedbackContainer = ({ feedbackList = [] }) => (
    <Container>
        {
            feedbackList.map((feedback) => (
                <FeedbackCard key={feedback.id} feedback={feedback} />
            ))
        }
    </Container>
);

export { FeedbackContainer };
