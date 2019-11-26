import styled from "styled-components";

const Input = styled.input`
  font-size: 18px;
  line-height: 48px;
  width: 100%;
  height: 48px;
  padding: 0 8px;
  border: 1px solid lightgray;
  box-sizing: border-box;

  & + & {
    margin-top: 8px;
  }

  :focus {
    outline: none;
  }
`;

export { Input };
