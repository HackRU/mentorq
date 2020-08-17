import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { request } from "../.././util";
import { logoutUser } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { recievedLoginUser } from "../../actions";


import {
  CardContent,
  Card,
  FormLabel as Label,
  Grid,
  Typography,
  Button,
  ButtonGroup,
} from "@material-ui/core";


const Ticket = ({
  ticket: { id, title, comment, contact, location, status},
}) => {
  const [currStatus, setCurrStatus] = useState(status);
  // state to display email when ticket is claimed 
  const [mentorEmail,setMentorEmail] = useState("");
  // Email is just taking current users email 
  const email = useSelector((store) => store.auth.email);
  
  //Variables from redux to check whether user is a mentor/director
  const director = useSelector((store) =>  store.auth.director );
  // this takes current logged in users email 
  const mentor = useSelector((store) => store.auth.mentor );
  
  //Checking if it gets set to mentor/director 
  console.log("this is a mentor:" ,mentor);
  // Set to empty if its not true 
  console.log("This is a director:",director);

  useEffect(() => {
    setCurrStatus(status);
    
  }, [status]);

  

  const claimTicket = async () => {
    setCurrStatus("CLAIMED");
    setMentorEmail(email);
   
  


    await request({
      path: `/tickets/${id}/`,
      type: "PATCH",
      body: {
        status: "CLAIMED",

      },
    });
  };

  const closeTicket = async () => {
    setCurrStatus("CLOSED");

    await request({
      path: `/tickets/${id}/`,
      type: "PATCH",
      body: {
        status: "CLOSED",
      },
    });
  };
  

 
  //if(currStatus === null & director === "true" & mentor === "true"){
    //display claim button 
  //}
 

  return (
    // displaying the ticket to the mentor 
    <Card>
      <CardContent>
        <Grid item>
          <Link to={`/ticket/${id}`}>
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
          </Link>

          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Label>Comment</Label>
              <Typography variant="body1" gutterBottom>
                {comment}
                
                
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Label>Contact</Label>
              <Typography variant="body1" gutterBottom>
                {contact}
              </Typography>
              <Label> Mentor </Label>
              <Typography variant="body1" gutterBottom>
              {currStatus ==="CLAIMED" && email}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Label>Location</Label>
              <Typography variant="body1" gutterBottom>
                {location}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Label>Status</Label>
              <Typography variant="body1" gutterBottom>
                {currStatus}
                
              </Typography>
            </Grid>
          </Grid>

                
            
            
            {/* Ternary Conditional Here to Check if mentor or director is true if
            if true then display buttons if not display null */}   
            { mentor || director ? 
            <div>
            <ButtonGroup color="secondary">
            <Button variant="contained" onClick={claimTicket}>
                Claim
            </Button>
            { currStatus == "OPEN" ?
            null  : 
            <Button variant="contained" onClick={closeTicket}>
            Close
           </Button>  } 
              
             </ButtonGroup>
             </div> : null }
            
            
          
        </Grid>
      </CardContent>
    </Card>
  );
};

export { Ticket };
