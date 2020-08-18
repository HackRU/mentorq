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
  ticket: { id, title, comment, contact, location, status,mentor_email},
}) => {
  const [currStatus, setCurrStatus] = useState(status);
  
  const [mentorEmail,setMentorEmail] = useState(mentor_email);

  const email = useSelector((store) => store.auth.email);
  
  const director = useSelector((store) =>  store.auth.director );
  
  const mentor = useSelector((store) => store.auth.mentor );
  
  console.log(director);


  useEffect(() => {
    setCurrStatus(status);
    setMentorEmail(mentor_email);
    
  }, [status,mentor_email]);

  

  const claimTicket = async () => {
    setCurrStatus("CLAIMED");
    setMentorEmail(email);
    
   
  

    
    await request({
      path: `/tickets/${id}/`,
      type: "PATCH",
      body: {
        status: "CLAIMED",
        mentor_email: email 

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
  
  const reOpen = async () => {
    setCurrStatus("OPEN");
    
    await request({
      path: `/tickets/${id}/`,
      type: "PATCH",
      body: {
        status: "OPEN",
        mentor_email: "",
        mentor: "",


      },
    });
  };
 
  
  let button;
  //IF Else for Buttons 
    if (mentor || director === true){
      console.log("SHOW BUTTONS");
      if (currStatus === "OPEN" ){
        button =  
        <div>   
          <ButtonGroup color="secondary">
            <Button variant="contained" onClick={claimTicket}>
              Claim
            </Button>
          </ButtonGroup>
        </div>;
      }
      else if (currStatus === "CLAIMED") {
        button = 
        <div>   
          <ButtonGroup color="secondary">
            <Button variant="contained" onClick={reOpen}>
              Reopen
            </Button>
                
            <Button variant="contained" onClick={closeTicket}>
            Close
            </Button>
          </ButtonGroup>
        </div>;
      } 
      else if (currStatus === "CLOSED" && director == true){
        button = 
        <div>   
        <ButtonGroup color="secondary">
          <Button variant="contained" onClick={reOpen}>
            Reopen
          </Button>
        </ButtonGroup>
      </div>;
      }
    }
    else {
      button = null;
      console.log("NULL");
    }  


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
              {currStatus ==="CLAIMED" && mentorEmail}
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
            
           
            { button }
            { /* mentor || director ? 

            <div>
              
            <ButtonGroup color="secondary">
            <Button variant="contained" onClick={claimTicket}>
                Claim
            </Button>
            { currStatus == "OPEN" ?
            null  : 
            <Button variant="contained" onClick={closeTicket}>
            Close
           </Button> 
            } 
             </ButtonGroup>
             </div> :
              null
          */ }

          
          
          

      


          

           
            
          
        </Grid>
      </CardContent>
    </Card>
  );
};

export { Ticket };
