import React, { Component } from 'react';
import {from, withStatus, status} from "./mockapi";

/*const submit = (handler) => (e) => {
    const sub = document.querySelector("#complaint").value;
    //setTimeout(handler(sub), 10000);
    handler(sub);
    console.log(sub);
}*/

class TicketPanel extends Component {

    constructor({client}) {
        super();
        this.state = {
          tickets: [],
        }
        const setTickets = (tickets) => {
            this.setState({tickets});
        };
        client.onTickets(setTickets);
        client.getTickets().then(setTickets);
    }

    onTicket(ticket) {

    }

    submit = (e) => {
        e.preventDefault();
        const sub = document.querySelector("#complaint").value;
        this.props.client.newTicket(sub);
        console.log(sub);
    }

    render() {
      const client = this.props.client;
      return(
        <div className="TicketPanel">
            <form id="ticket" onSubmit={this.submit}>
            <input id="complaint" type="text"
                   placeholder="text"
                   style={{width: "95%"}}/><br/>
            <button type="submit"> Submit Ticket </button>
            </form>
        </div>
      );
    }
}

export {
    TicketPanel
};
