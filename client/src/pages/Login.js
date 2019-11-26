import React, { useState } from "react";
import { Input } from "../components/Input";
import { loginAction } from "../actions";
import { useDispatch } from "react-redux";
import styled from "styled-components";

const LoginContainer = styled.div`
  max-width: 24rem;
  margin: 0 auto;
`;

const Button = styled.input.attrs(props => ({
  type: "submit"
}))`
  margin-top: 8px;
  appearance: none;
  background-color: orange;
  font-size: 18px;
  color: white;
  width: 100%;
  height: 48px;
  border: none;
`;

const Login = () => {
  const [{ email, password }, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();
    dispatch(loginAction({ email, password }));
  };

  return (
    <LoginContainer>
      <h1>Mentor</h1>
      <form onSubmit={onSubmit}>
        <Input
          type="email"
          value={email}
          onChange={({ target }) =>
            setForm(state => ({ ...state, email: target.value }))
          }
        />
        <Input
          type="password"
          value={password}
          onChange={({ target }) =>
            setForm(state => ({ ...state, password: target.value }))
          }
        />
        <Button />
      </form>
    </LoginContainer>
  );
};

export default Login;
