import React from "react";
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { shallow, mount } from "enzyme";
import App from "./App";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core";
import { Input } from './components/Input';

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
    const wrapper = mount(<Provider store={store}><App /></Provider>);
    expect(wrapper.contains(<Dashboard />)).toEqual(true);
  });

  /*it("Renders Ticket Form", () => {
    store = mockStore(login)
    const wrapper = mount(
      <MuiThemeProvider
            theme={{
              spacing: 4,
              palette: {
                primary: {
                  main: "#c85151", // red
                },
                secondary: {
                  light: "#82d18f",
                  main: "#4cac5c", // green
                },
                tertiary: {
                  main: "#f3bb44", // yellow
                  dark: "#ffad00",
                },
                textPrimary: {
                  main: "white",
                },
                textSecondary: {
                  main: "#ededed",
                }
              }
            }}
          >
          <Provider store={store}><Dashboard /></Provider>
        </MuiThemeProvider>);

    expect(wrapper.contains(<NewTicket />)).toEqual(true);
  });*/
});
