import React, { Component } from 'react';
import {from, withStatus, status} from "./mockapi";
import { Jumbotron,
  Container,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem} from 'reactstrap';
import {Login} from "./Login.js";
import './Header.css';

class Header extends Component {

    constructor({client}) {
        super();
        this.state = {

        };
    }

    render() {
      const {loggedIn, onLogin, onLogout} = this.props;
      return(
        <div className ="header">
          <Navbar light expand="md">
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavbarBrand href="/">NavBar</NavbarBrand>
                </NavItem>
                <NavItem>
                <Login loggedIn={loggedIn}
                      onLogin={onLogin}
                      onLogout={onLogout} />
                </NavItem>
              </Nav>
          </Navbar>
          <Container fluid className="titlecontainer">
              <h1 className="title">MentorQ</h1>
          </Container>
        </div>

      );
    }
}

export default Header;
