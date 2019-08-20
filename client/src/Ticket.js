import React, { Component } from 'react';
import { Button, Card, CardHeader, CardBody} from 'reactstrap';
import './Ticket.css';

class Ticket extends Component {

    constructor({ticket}) {
      super();
    }

    submit = (e) => {
        e.preventDefault();
        const { text, owner, location, slack } = this.props;
        var status = this.props.status;
        if(status === "claimed"){
            status = "closed"
        }
        else if (status === "open"){
            status = "claimed"
        }
        var ticket = {owner, text, status, location, slack}
        this.props.client.saveTicket(ticket);
    }

    cancel = (e) => {
        e.preventDefault();
        const { text, owner, location, slack } = this.props;
        var status = this.props.status;
        if(status === "claimed"){
            status = "open"
        }
        var ticket = {owner, text, status, location, slack}
        this.props.client.saveTicket(ticket);
    }

    render() {
      const { owner, location, slack, text } = this.props;
      var status = this.props.status;
      var buttonText = "CLAIM";
      if(status === "claimed"){
        buttonText = "Close"
      }
      const isClosed = (component) => status === "closed" ? null: component;
      const isClaimed = (component) => status === "claimed" ? component: null;
      return(
        <Card className="ticket">
        <CardHeader>
          <Button close/>
          <b>{owner}</b>
        </CardHeader>
        <CardBody>
          <div>{text}</div>
          <div><i>({location})</i></div>
          <div><b>Contact: </b>{slack}</div>
          <div><i>({status})</i></div>
        </CardBody>
        {isClosed(
          <Button
            id="Button"
            color="primary"
            size="sm"
            onClick={this.submit}
          >
            <b>{buttonText}</b>
          </Button>
        )}
        {isClaimed(
          <Button
            id="Button"
            color="danger"
            size="sm"
            onClick={this.cancel}
          >
            <b>Cancel</b>
          </Button>
        )}
        </Card>
      );
    }
}

export default Ticket;
