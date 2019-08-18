import React, { Component } from 'react';
import { Button, Card, CardTitle} from 'reactstrap';

class Ticket extends Component {

    constructor({ticket}) {
      super();
      this.state = {
          complaint: ticket.text,
          slack: ticket.slack,
          location: ticket.location,
          owner: ticket.owner,
          status: ticket.status,
      };
    }

    submit = (e) => {
        e.preventDefault();
        if(this.state.status == "claimed"){
            this.state.status = "closed"
        }
        else if (this.state.status == "open"){
            this.state.status = "claimed"
        }
        var ticket = {owner: this.state.owner, text: this.state.complaint, status: this.state.status}
        this.props.ticket.client.saveTicket(ticket);
    }

    cancel = (e) => {
        e.preventDefault();
        if(this.state.status == "claimed"){
            this.state.status = "open"
        }
        var ticket = {owner: this.state.owner, text: this.state.complaint, status: this.state.status}
        this.props.ticket.client.saveTicket(ticket);
    }

    render() {
      const owner = this.state.owner;
      const complaint = this.state.complaint;
      const location = this.state.location;
      const status = this.state.status;
      const slack = this.state.slack;
      var text = "Claim";
      if(status == "claimed"){
        text = "Close"
      }
      const isClosed = (component) =>
          status == "closed" ? null: component;
      const isClaimed = (component) =>
          status == "claimed" ? component: null;
      return(
        <Card className="ticket" body outline color="secondary">
        <CardTitle>
        <b>{owner}</b>
        <Button close />
        </CardTitle>
        <div>{complaint}</div>
        <div>{location}</div>
        <div>{slack}</div>
        <div>{status}</div>
        {isClosed(<Button id="Button" color="primary" type="submit" onClick={this.submit}> {text} </Button>)}
        {isClaimed(<Button id="Button" color="danger" type="submit" onClick={this.cancel}> Cancel </Button>)}
        </Card>
      );
    }
}

export {
      Ticket
};
