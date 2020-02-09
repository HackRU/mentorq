import styled from "styled-components";

const Input = styled.input`
  font-size: 18px;
  line-height: 48px;
  width: 100%;
  height: 48px;
  padding: 0 8px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  background-color: whitesmoke;

  box-sizing: border-box;

  & + & {
    margin-top: 8px;
  }

  :focus {
    outline: none;
  }
`;

export { Input };
