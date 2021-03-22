import React from "react";
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { shallow, mount } from "enzyme";
import App from "../App";
import Login from "./Login";
import { Input } from '../components/Input';
import { SignInButton } from '../components/Login/SignInButton';
import { ErrorMessage } from '../components/Login/ErrorMessage';

describe('Login Screen', () => {
    const initialState = { isLoggedIn: false }
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
    const errorState = {
        isLoggedIn: false,
        hasErrors: true,
        email: "",
        refreshToken: "",
        accessToken: "",
        lcsToken: "",
        // validUntil: "",
        director: false,
        mentor: false,
        name: "",
        loadingLogin: false
    }
    const notlogin = { auth: defaultState }
    const errorlogin = { auth: errorState }
    const mockStore = configureStore()
    const mockErrorStore = configureStore()
    let errorStore
    let store

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
    //OnSubmit called when sign in button clicked
    it("Calls onSubmit when Logging in", () => {
        store = mockStore(notlogin)
        const onSubmitMock = jest.fn();
        //const component = mount(<Provider store={store}><Login onSubmit={onSubmitMock} /></Provider>);
        const button = shallow(<SignInButton onSubmit={onSubmitMock} />);
        //component.find("input").filter({ type: 'email' }).simulate('change', { target: { value: 'myEmail' } })
        //component.find("input").filter({ type: 'password' }).simulate('change', { target: { value: 'myPassword' } })
        button.find('#button').simulate('click');
        expect(onSubmitMock.mock.calls.length).toEqual(1);
    });
    //TEST FAILED Login
    it("Shows error if wrong credentials", () => {
        errorStore = mockErrorStore(errorlogin);
        const wrapper = mount(<Provider store={errorStore} ><Login /></Provider>);
        expect(wrapper.contains(<ErrorMessage />)).toBeTruthy();
    });
    //TEST SUCCESSFUL Login
    it("Shows no error if credentials have no errors", () => {
        store = mockStore(notlogin);
        const wrapper = mount(<Provider store={store} ><Login /></Provider>);
        expect(wrapper.contains(<ErrorMessage />)).toBe(false);
    });
    //TEST FOR INFINITE LOADING SCREEN
});
