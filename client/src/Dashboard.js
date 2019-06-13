import React, { Component } from 'react';
import {from, withStatus, status} from "./mockapi";
import {Queue} from "./Queue.js";
import {TicketPanel} from "./TicketPanel.js";

class Dashboard extends Component {

    constructor({client}) {
        super();
        this.state = {
          role: client.userData.role
        }
    }

    render() {
      const client = this.props.client;
      const isHacker = (component) =>
            this.state.role.hacker ? component: null;
      return(
        <div className="Dashboard">
          <div>
            Dashboard
            {isHacker(<TicketPanel client={client}/>)}
          </div>
          {<Queue client={client}/>}
        </div>
      );
    }
}

export {
    Dashboard
};
