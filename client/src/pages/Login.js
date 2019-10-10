import React, { useState } from "react";
import { Input } from "../components/Input";
import { loginAction } from "../actions";
import { useDispatch } from "react-redux";

const Login = () => {
  const [{ email, password }, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();
    dispatch(loginAction({ email, password }));
  };

  return (
    <div>
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
        <input type="submit" />
      </form>
    </div>
  );
};

export default Login;
