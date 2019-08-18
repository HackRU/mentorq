import React, { Component } from 'react';
import {from, withStatus, status} from "./mockapi";
import {Queue} from "./Queue.js";
import {TicketPanel} from "./TicketPanel.js";
import { Container, Row, Col } from 'reactstrap';

class Dashboard extends Component {

    constructor({client}) {
        super();
        this.state = {
          role: client.userData.role
        }
    }

    render() {
      const client = this.props.client;
      var role = "";
      if (client.userData.role.admin) {
        role = "Admin";
      } else if(client.userData.role.mentor){
        role = "Mentor";
      } else{
        role = "Hacker";
      }
      const isHacker = (component) =>
            this.state.role.hacker ? component: null;
      return(
        <Container className="Dashboard">
          <b>{role}</b>
          <Row>
            <Col>
              {isHacker(<TicketPanel client={client}/>)}
            </Col>
            <Col>
              {<Queue client={client}/>}
            </Col>
          </Row>
        </Container>
      );
    }
}

export {
    Dashboard
};
