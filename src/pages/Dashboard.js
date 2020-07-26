import React, { useState, useEffect } from "react";
import { TicketContainer } from "../components/TicketContainer";
import { NewTicket } from "../components/NewTicket";
import DashboardContainer from "../components/DashboardContainer";
import { request } from "../util";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { AdminMain } from './Admin/AdminMain';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));


const Dashboard = () => {
  // State for tickets and a way to change the tickets. The array will hold the tickets  
  const [tickets, setTickets] = useState([]);
  // State variable for emails 
  const email = useSelector((store) => store.auth.email);
  const isDirector = useSelector((store) => store.auth.director);
  const classes = useStyles();

  useEffect(() => {
    const update = async () => {
      setTickets(await request({ path: "/tickets/" }));
    };

    const interval = setInterval(update, 3000);
    update();

    return () => {
      clearInterval(interval);
    };
  }, []);


  

  const onAddTicket = async (ticket) => {
    setTickets([...tickets, ticket]);

  
    

    await request({
      path: "/tickets/",
      type: "POST",
      body: {
        status: "OPEN",
        owner_email: email,
        title: ticket.title,
        comment: ticket.comment,
        contact: ticket.contact,
        location: ticket.location,
      },
    });
  };
  if (isDirector) {
    return (
      <AdminMain />
    );
  }
  else {
    return (
      <DashboardContainer>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <NewTicket onAddTicket={onAddTicket} />
          </Grid>
          <Grid item xs={8}>
            <TicketContainer tickets={tickets} />
          </Grid>
        </Grid>
      </DashboardContainer>
    );
  }
};

export default Dashboard;
