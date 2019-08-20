import React, { Component } from 'react';
import { Button, Card, CardTitle, Form, FormGroup, Label, Input} from 'reactstrap';
import './TicketPanel.css';

class TicketPanel extends Component {

    constructor({client}) {
        super();
        this.state = {
            text: "",
            slack: "",
            location: "cafeteria",
            valid: true,
        };
    }

    onTextChange = (e) => {
      this.setState({text: e.target.value});
      if(this.state.text !== "" && this.state.slack !== ""){
        this.setState({valid:false});
      }
    }

    onSlackChange = (e) => {
      this.setState({slack: e.target.value});
      if(this.state.text !== "" && this.state.slack !== ""){
        this.setState({valid:false});
      }
    }

    onLocationChange = (e) => {
      this.setState({location: e.target.value});
    }

    submit = (e) => {
        e.preventDefault();
        console.log(this.props.client);
        var ticket = {owner: this.props.client.userData.username, text: this.state.text, slack: this.state.slack, location: this.state.location};
        this.props.client.newTicket(ticket);
        //Refresh fields/page
    }

    render() {
      const client = this.props.client;
      return(
        <Card className="ticketPanel" body outline color="Gainsboro">
            <CardTitle className="username">Hey, {client.userData.username}!</CardTitle>
            <CardTitle className="help">How can we help you?</CardTitle>
            <Form id="ticket">
            <FormGroup className="ticketInput">
            <Label for="text">I need help with</Label>
            <Input id="text" type="text"
                   placeholder="text" onChange={this.onTextChange}/><br/>
            </FormGroup>
            <FormGroup>
            <Label for="location">You can find me at</Label>
            <Input type="select" id="location" onChange={this.onLocationChange}>
                    <option value="cafeteria">Cafeteria</option>
                    <option value="lounge">Lounge</option>
            </Input>
            </FormGroup>
            <FormGroup className="ticketInput">
            <Label for="slack">You can contact me through</Label>
            <Input id="slack" type="text"
                    placeholder="slack" onChange={this.onSlackChange}/><br/>
            </FormGroup>
            <Button className="button"
                    color="primary"
                    type="submit"
                    block
                    disabled={this.state.valid}
                    onClick={this.submit}>
            HELP ME! </Button>
            </Form>
        </Card>
      );
    }
}

export {
    TicketPanel
};
