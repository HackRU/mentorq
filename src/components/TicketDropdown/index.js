import React from 'react';
import { Ticket } from "../Ticket";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-row-gap: 16px;
  text: 100vw;
  word-wrap: break-word;
`;

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.tertiary.main,
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  body: {
    backgroundColor: 'rgba(0, 0, 0, .0)',
    paddingBottom:8
  },
}));

const TicketDropdown = ({
  group, tickets, defaultOpen, initFeedback
}) =>  {
  const [expanded, setExpanded] = React.useState('panel1');
  const classes = useStyles();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const sortByTimeOpen = (tickets = []) => {
    // owner_email
    tickets.sort((a, b) => new Date(b.created_datetime).valueOf() - new Date(a.created_datetime).valueOf())
  }

  console.log(initFeedback);

  return (
    <div>
      <Accordion className={classes.body} expanded={expanded === 'panel1'} onChange={handleChange('panel1')} defaultExpanded={defaultOpen}>
        <AccordionSummary
          className={classes.header}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography>{ group.toUpperCase() }</Typography>
        </AccordionSummary>
          <Container style={{ position: 'relative', zIndex: '2' }}>
            {sortByTimeOpen(tickets)}
            {tickets.map((ticket) => (
              <Ticket key={ticket.id} ticket={ticket} initFeedback={initFeedback}/>
            ))}
          </Container>
        </Accordion>
    </div>
  );
}

export { TicketDropdown };
