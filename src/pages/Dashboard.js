import React, { useState, useEffect } from "react";
import { TicketContainer } from "../components/TicketContainer";
import { NewTicket } from "../components/NewTicket";
import DashboardContainer from "../components/DashboardContainer";
import AdminStats from "../components/Stats/AdminStats";
import MentorLeaderboard from "../components/Stats/MentorLeaderboard";
import Feedback from "../components/Feedback";
import { Stats } from "../components/Stats";
import { request } from "../util";
import { useSelector } from "react-redux";
import { Grid } from "@material-ui/core";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.tertiary.main,
    color: theme.palette.textPrimary.main,
  },
}));

// Tab Menu
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const Dashboard = () => {
  // State for tickets and a way to change the tickets. The array will hold the tickets
  const [tickets, setTickets] = useState([]);
  // State variable for emails
  const [numTickets, setNumTickets] = useState(tickets.length || null);
  const email = useSelector((store) => store.auth.email);
  const isDirector = useSelector((store) => store.auth.director);
  const isMentor = useSelector((store) => store.auth.mentor);
  const classes = useStyles();

  useEffect(() => {
    const update = async () => {
      setTickets(await request({ path: "/tickets/" }));
    };

    const interval = setInterval(update, 30000);
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
        // location: ticket.location,
        owner: ticket.owner,
        active:ticket.active,
      },
    });

    const update = async () => {
      setTickets(await request({ path: "/tickets/" }));
    };

    update();
  };

  // change tab on menu
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <DashboardContainer>
      <Grid container spacing={3}>
        {!isDirector ? <Grid item xs={12} sm={4}>
          <NewTicket onAddTicket={onAddTicket} numTickets={tickets.filter(ticket => (ticket.status === "OPEN" && ticket.owner_email === email)).length} />
        </Grid> : ""}

        <Grid item xs={12} sm={isDirector ? 12 : 8}  >
          <AppBar position="static" className={classes.root}>
            <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
              {isMentor ? <Tab wrapped label="My Tickets" {...a11yProps(0)} /> : <Tab wrapped label="Active Tickets" {...a11yProps(0)} />}
              {isMentor ? <Tab wrapped label="Ticket Queue" {...a11yProps(1)} /> : <Tab wrapped label="Closed Tickets" {...a11yProps(1)} />}
              <Tab label="Statistics" {...a11yProps(2)} />
              {isDirector ? <Tab wrapped label="Feedback" {...a11yProps(3)} /> : ""}
              {isDirector && isMentor ? <Tab wrapped label="Active Tickets" {...a11yProps(4)} /> : ""}
              {isDirector && isMentor ? <Tab wrapped label="Closed Tickets" {...a11yProps(5)} /> : ""}
            </Tabs>
          </AppBar>
          {isMentor ?
            <div>
              <TabPanel value={value} index={0} >
                <TicketContainer tickets={tickets} ticketType="my tickets" />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <TicketContainer tickets={tickets} ticketType="ticket queue" />
              </TabPanel>
            </div>
            :
            <div>
              <TabPanel value={value} index={0}>
                <TicketContainer tickets={tickets} ticketType="active" />
              </TabPanel>
              <TabPanel value={value} index={1}>
                <TicketContainer tickets={tickets} ticketType="closed" />
              </TabPanel>
            </div>
          }
          <TabPanel value={value} index={2}>
            {isDirector ? <div><AdminStats /><br /><MentorLeaderboard /></div> : <Stats />}
          </TabPanel>
          {isDirector ?
            <TabPanel value={value} index={3}>
              <Feedback />
            </TabPanel> : ""}
          {isDirector && isMentor ?
            <div>
              <TabPanel value={value} index={4}>
                <TicketContainer tickets={tickets} ticketType="active" />
              </TabPanel>
              <TabPanel value={value} index={5}>
                <TicketContainer tickets={tickets} ticketType="closed" />
              </TabPanel>
            </div> : ""
          }
        </Grid>
      </Grid>
    </DashboardContainer >
  );

};

export default Dashboard;
