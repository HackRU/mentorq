import React from "react";
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { shallow, mount } from "enzyme";
import App from "../App";
import Dashboard from "./Dashboard";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core";
import { Input } from '../components/Input';
import theme from "../design/theme.js"
import { ThemeProvider } from "styled-components";
import NewTicket from "../components/NewTicket";

//TEST SUITE TO TEST THAT ALL COMPONENTS RENDER FOR HACKER/MENTOR
describe('Dashboard View', () => {
  const defaultState = {
    isLoggedIn: true,
    hasErrors: false,
    email: "",
    refreshToken: "",
    accessToken: "",
    lcsToken: "",
    // validUntil: "",
    director: false,
    mentor: false,
    name: "",
    loadingLogin: false
  };
  const login = { auth: defaultState }
  const mockStore = configureStore()
  let store

  it("Renders Dashboard Component", () => {
    store = mockStore(login)
    const wrapper = mount(<Provider store={store} ><App /></Provider>);
    expect(wrapper.contains(<Dashboard />)).toEqual(true);
  });

  it("Renders Ticket Form", () => {
    store = mockStore(login)
    const wrapper = shallow(<ThemeProvider theme={theme}><Provider store={store}><Dashboard /></Provider></ThemeProvider>);
    expect(wrapper.contains(<NewTicket />)).toEqual(true);
  });
});
