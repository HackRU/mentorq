import React, { Component } from 'react';
import {from, withStatus, status} from "./mockapi";
import Ticket from "./Ticket.js";
import './WelcomeBox.css';
import './Queue.css';

class Queue extends Component {

    constructor({client}) {
        super();
        this.state = {
            tickets: [],
        };
        const setTickets = (tickets) => {
            this.setState({tickets});
        };
        client.onTickets(setTickets);
        client.getTickets().then(setTickets);
    }

    onTicket(ticket) {

    }
    render() {
        const client = this.props.client;
        const role = this.props.client.userData.role;
        const myUsername = this.props.client.userData.username;
        let tickets = [];
        if (role.admin) {
            tickets = this.state.tickets;
        } else if (role.mentor) {
            tickets = withStatus(status.closed, true)(this.state.tickets);
        } else {
            tickets = from(myUsername)(withStatus(status.open)(this.state.tickets));
        }
        return (
          <ul className="queue">
            {tickets.map(ticket =>
              <li key={ticket.owner + ticket.text}><Ticket {...ticket} client={client}/></li>
            )}
          </ul>
        );
    }
}

export default Queue;
