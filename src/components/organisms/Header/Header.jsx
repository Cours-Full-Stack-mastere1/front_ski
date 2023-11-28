import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const StyledHeader = styled.div`
  background-color: #0077b6;
  height: 8vh;
  width: 100%;
  display: flex;
  align-text: center;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: white;
`;

const Header = () => {
  const user = useSelector((state) => {
    return state.user;
  });
  return (
    <StyledHeader>
      <div></div>
      <h1>Stations de Skis</h1>
      <div>{user?.username ? user.username : "Not connected"}</div>
    </StyledHeader>
  );
};

export default Header;
