import React, { Component } from "react";
import {
  Button,
} from "@material-ui/core";

class TicketButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = props.handleClick.bind(this);
    this.variant = "contained"
    this.color = "secondary"
  }
  render() {
    return <Button variant={this.variant} color={this.color} onClick={this.handleClick}>
              {this.props.type}
            </Button>
  }
}

export { TicketButton };
