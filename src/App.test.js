import React from "react";
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { shallow, mount } from "enzyme";
import App from "./App";
import Login from "./pages/Login";
import { Input } from './components/Input';

describe('Login Screen', () => {
  const initialState = {isLoggedIn:false}
  const defaultState = {
    isLoggedIn: false,
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
  const notlogin = { auth: defaultState }
  const mockStore = configureStore()
  let store

  //Testcase should always be true
  it('Testing Loaded', () => {
    expect(true).toEqual(true);
  });
  //App renders without crashing
  it("Renders Without Crashing", () => {
    store = mockStore(initialState)
    shallow(<Provider store={store}><App /></Provider>);
  });
  //If not logged in, Login component is rendered
  it("Renders Login Component", () => {
    store = mockStore(notlogin)
    const wrapper = mount(<Provider store={store}><App /></Provider>);
    expect(wrapper.contains(<Login />)).toEqual(true);
  });
  /*it("Calls onSubmit when Logging in", () => {
    store = mockStore(notlogin)
    const onSubmitMock = jest.fn();
    const component = mount(<Provider store={store}><Login /></Provider>);
    component.find("input").filter({ type: 'email' }).simulate('change', { target: { value: 'myEmail' } })
    component.find("input").filter({ type: 'password' }).simulate('change', { target: { value: 'myPassword' } })
    component.find('button').simulate('click');
  });*/
  //TEST FAILED Login

  //TEST SUCCESSFUL Login

  //TEST FOR INFINITE LOADING SCREEN
});
