import React from "react";
import { styled } from "styled-components";

const StyledCard = styled.div``;

const Card = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

export default Card;
