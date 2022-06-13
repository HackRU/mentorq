import React, { useState, useEffect } from "react";
import { logoutUser } from "../actions";
import { TicketContainer } from "../components/TicketContainer";
import { NewTicket } from "../components/NewTicket";
import DashboardContainer from "../components/DashboardContainer";
import AdminStats from "../components/Stats/AdminStats";
import MentorLeaderboard from "../components/Stats/MentorLeaderboard";
import Feedback from "../components/Feedback";
import { Settings } from "../components/Settings";
import Stats from "../components/Stats";
import { request } from "../util";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import Tooltip from "@material-ui/core/Tooltip";
import {
  AppBar,
  Button,
  Box,
  Grid,
  Hidden,
  Link,
  makeStyles,
  Tabs,
  Tab,
  Typography,
} from '@material-ui/core/';
import OneSignal from 'react-onesignal';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.tertiary.main,
    color: theme.palette.textPrimary.main,
  },
  button: {
    margin: 2,
  },
  footer: {
    textAlign: 'center',
    paddingBottom: 5,
  }
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
  const email = useSelector((store) => store.auth.email);
  const isDirector = useSelector((store) => store.auth.director);
  const isMentor = useSelector((store) => store.auth.mentor);
  const classes = useStyles();
  const [numOpen, setNumOpen] = useState(useSelector((store) => store.auth.numOpen) || 0);
  const [numClaimed, setNumClaimed] = useState(useSelector((store) => store.auth.numClaimed) || 0);
  const dispatch = useDispatch();

  useEffect(() => {

    const update = async () => {
      setTickets(await request({ path: "/tickets/" }));
    };

    const interval = setInterval(update, 30000);
    update();

    if (isMentor)
    {
      OneSignal.init({
        appId: "9857924c-89c4-4d05-80f5-a8422c67e85a"
        //, subdomainName: "mentorq"
      });

      console.log("onesignal initialized");
      
      //Sends the 'notifications':'mentor' tag to OneSignal
      OneSignal.sendTag("notifications", "mentor").then(() => {
        console.log("Sent Tag: (notifications, mentor)");
      })

      console.log("tag sent");
    }

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
        owner: ticket.owner,
        active: ticket.active,
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
    <div>
      <DashboardContainer>
        <Grid container spacing={3}>
          {!isDirector ?
            <Grid item xs={12} sm={4}>
              <NewTicket onAddTicket={onAddTicket} numTickets={tickets.filter(ticket => (ticket.status === "OPEN" && ticket.owner_email === email)).length} />
            </Grid> : ""}

          <Grid item xs={12} sm={isDirector ? 12 : 8}  >
            <AppBar position="static" className={classes.root}>
              <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
                {isMentor ?
                  <Tooltip title="Tickets I Have Claimed" arrow>
                    <Tab wrapped label="My Tickets" {...a11yProps(0)} />
                  </Tooltip> :
                  <Tooltip title="Open and Claimed Tickets" arrow>
                    <Tab wrapped label="Active Tickets" {...a11yProps(0)} />
                  </Tooltip>}

                {isMentor ?
                  <Tooltip title="Remaining Open Tickets and Other" arrow>
                    <Tab wrapped label="Ticket Queue" {...a11yProps(1)} />
                  </Tooltip> :
                  <Tooltip title="Closed and Cancelled Tickets" arrow>
                    <Tab wrapped label="Closed Tickets" {...a11yProps(1)} />
                  </Tooltip>}

                <Tab label="Statistics" {...a11yProps(2)} />

                {isDirector ? <Tab wrapped label="Feedback" {...a11yProps(3)} /> : ""}

                {isDirector && isMentor ?
                  <Tooltip title="Open and Claimed Tickets" arrow>
                    <Tab wrapped label="Active Tickets" {...a11yProps(4)} />
                  </Tooltip> : ""}

                {isDirector && isMentor ?
                  <Tooltip title="Closed and Cancelled Tickets" arrow>
                    <Tab wrapped label="Closed Tickets" {...a11yProps(5)} />
                  </Tooltip> : ""}

                {isMentor ? <Tab wrapped label="Settings" {...a11yProps(6)} /> : ""}                

              </Tabs>
            </AppBar>

            {isMentor ?
              <div>
                <TabPanel value={value} index={0} >
                  <TicketContainer tickets={tickets} ticketType="my tickets" numClaimed={numClaimed} numOpen={numOpen} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <TicketContainer tickets={tickets} ticketType="ticket queue" numClaimed={numClaimed} numOpen={numOpen} />
                </TabPanel>
                <TabPanel value={value} index={3}>
                  <Settings />
                </TabPanel>
              </div>
              :
              <div>
                <TabPanel value={value} index={0}>
                  <TicketContainer tickets={tickets} ticketType="current" numClaimed={numClaimed} numOpen={numOpen} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <TicketContainer tickets={tickets} ticketType="closed" numClaimed={numClaimed} numOpen={numOpen} />
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
                  <TicketContainer tickets={tickets} ticketType="current" numClaimed={numClaimed} numOpen={numOpen} />
                </TabPanel>
                <TabPanel value={value} index={5}>
                  <TicketContainer tickets={tickets} ticketType="closed" numClaimed={numClaimed} numOpen={numOpen} />
                </TabPanel>
              </div> : ""
            }

            

          </Grid>
        </Grid>
      </DashboardContainer >
      <div className={classes.footer}>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Hidden smUp>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => {
                dispatch(logoutUser());
              }}
            >
              Logout
            </Button>
          </Hidden>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
