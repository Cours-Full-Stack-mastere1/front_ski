import React from "react";
import { styled } from "styled-components";

const StyledCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 80%;
  margin: auto;
`;

const Card = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

export default Card;
