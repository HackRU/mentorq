import React from "react";
import { NavContainer } from "./styled/NavContainer";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions";
import { Button } from "../Button";
import { Text } from "../Text";
import styled from "styled-components";

const NavGroup = styled.div`
  display: inline-block;
`;

const Nav = () => {
  const dispatch = useDispatch();
  const email = useSelector(({ auth: { email } }) => email);

  return (
    <NavContainer>
      <Text>MentorQ</Text>
      <NavGroup>
        <Text>{email}</Text>
        <Button
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </Button>
      </NavGroup>
    </NavContainer>
  );
};

export { Nav };
