import styled from "styled-components";

const Button = styled.button`
  margin-top: 8px;
  appearance: none;
  background-color: #14ccbd;
  font-size: 16px;
  color: white;
  padding: 8px 10px;
  font-weight: 600;
  margin-left: 8px;
  border-radius: 18px;
  border: none;
  transition: 0.1s ease background-color;

  :hover {
    cursor: pointer;
    background-color: #00998c;
    color: #E1E8ED;
  }
`;

export { Button };
