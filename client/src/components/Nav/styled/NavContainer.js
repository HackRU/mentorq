import styled from "styled-components";

const NavContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  font-size: 18px;
  line-height: 48px;
  width: 100%;
  padding: 8px 16px;
  border-bottom: 1px solid lightgray;
  box-shadow: 0 0 10px rgba(16, 22, 26, 0.2);
  background-color: white;

  & + & {
    margin-top: 8px;
  }

  :focus {
    outline: none;
  }
`;

export { NavContainer };
