import React, { Component } from 'react';
import {Card, CardBody, CardSubtitle, CardTitle, CardText } from 'reactstrap';
import './WelcomeBox.css';

class WelcomeBox extends Component {

    constructor(role) {
      super();
      this.state = {
        role: role
      };
    }

    render() {
      return(
        <div>
        <Card className="WelcomeBox">
          <CardBody>
            <CardTitle><b>Welcome {this.state.role.role}!</b></CardTitle>
            <CardSubtitle><i>xx:xx xx/xx/2019</i></CardSubtitle>
            <CardText>Need some help? Just fill out the support ticket below.</CardText>
          </CardBody>
        </Card>
      </div>
      );
    }
}

export {
      WelcomeBox
};
