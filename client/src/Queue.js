import React, { Component } from 'react';
import {from, withStatus, status} from "./mockapi";
import {Ticket} from "./Ticket.js";
import './Queue.css';

const TicketDisplay = ({text, owner, status, location, slack, client}) => {
    var ticket = {
      client: client,
      text: text,
      owner: owner,
      status: status,
      location: location,
      slack: slack,
    };
    console.log(ticket);
    return <li><Ticket ticket = {ticket}/></li>;
};

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
            tickets = this.state.tickets.filter(withStatus(status.open));
        } else {
            tickets = this.state.tickets
                .filter(withStatus(status.open))
                .filter(from(myUsername));
        }
        return (
          <ul className="queue">
            {tickets.map(ticket => <TicketDisplay {...ticket} client={client}/>)}
          </ul>
        );
    }
}

export {
    Queue
};
