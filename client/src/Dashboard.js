import React, { Component } from 'react';
import Queue from "./Queue.js";
import {TicketPanel} from "./TicketPanel.js";
import {WelcomeBox} from "./WelcomeBox.js";
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
          <Row>
            <Col sm={{ size: 8, offset: 2}}>
              {<WelcomeBox role={role}/>}
            </Col>
          </Row>
          <Row>
            <Col sm={{ size: 4, offset: 2}}>
              {isHacker(<TicketPanel client={client}/>)}
            </Col>
            <Col sm={{ size: 4 }}>
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
