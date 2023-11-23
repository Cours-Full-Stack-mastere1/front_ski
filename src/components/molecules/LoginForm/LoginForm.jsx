import React, { useState, useEffect } from "react";
import { Button, Input, Card } from "../../atoms";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, loginCheck } from "../../../store";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const dispatch = useDispatch();
  const validate = () => {
    dispatch(loginCheck({ username: username, password: password }));
  };

  return (
    <Card>
      <Input placeholder="Username" onChange={handleUsernameChange} />
      <Input placeholder="Password" onChange={handlePasswordChange} />
      <Button buttonTitle="Connexion" action={validate} />
    </Card>
  );
};

export default LoginForm;
