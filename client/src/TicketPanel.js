import React, { Component } from 'react';
import {from, withStatus, status} from "./mockapi";
import { Button, Card, CardTitle, Form, FormGroup, Label, Input} from 'reactstrap';
import './TicketPanel.css';

class TicketPanel extends Component {

    constructor({client}) {
        super();
        this.state = {
            complaint: "",
            slack: "",
            location: "cafeteria",
        };
    }

    onComplaintChange = (e) => {
      //console.log("Complaint: " + e.target.value);
      this.setState({complaint: e.target.value});
    }

    onSlackChange = (e) => {
      //console.log("Slack: " + e.target.value);
      this.setState({slack: e.target.value});
    }

    onLocationChange = (e) => {
      //console.log("Location: " + e.target.value);
      this.setState({location: e.target.value});
    }

    submit = (e) => {
        e.preventDefault();
        var ticket = {complaint: this.state.complaint, slack: this.state.slack, location: this.state.location};
        this.props.client.newTicket(ticket);
        console.log(ticket);
    }

    render() {
      const client = this.props.client;
      return(
        <Card className="ticketPanel" body outline color="secondary">
            <CardTitle>Ticket</CardTitle>
            <Form id="ticket">
            <FormGroup className="ticketInput">
            <Label for="complaint">Complaint</Label>
            <Input id="complaint" type="text"
                   placeholder="complaint" onChange={this.onComplaintChange}/><br/>
            </FormGroup>
            <FormGroup className="ticketInput">
            <Label for="slack">Slack</Label>
            <Input id="slack" type="text"
                    placeholder="slack" onChange={this.onSlackChange}/><br/>
            </FormGroup>
            <FormGroup>
            <Label for="location">Location</Label>
            <Input type="select" id="location" onChange={this.onLocationChange}>
                    <option value="cafeteria">Cafeteria</option>
                    <option value="lounge">Lounge</option>
            </Input>
            </FormGroup>
            <Button color="primary" type="submit" onClick={this.submit}> Submit Ticket </Button>
            </Form>
        </Card>
      );
    }
}

export {
    TicketPanel
};
