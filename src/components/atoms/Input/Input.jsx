import React from "react";
import styled from "styled-components";
const StyledInput = styled.input`
  background-color: #f5f5f5;
  border: 1px solid #a9a9a9;
  border-radius: 4px;

  color: #000000;
  font-size: 16px;
  padding: 10px;
  margin-bottom: 10px;
`;

const Input = (props) => {
  return <StyledInput {...props}></StyledInput>;
};

export default Input;
