import React, { useState, useEffect } from "react";
import { Button, Input, Card } from "../../atoms";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, loginCheck } from "../../../store";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logged, setLogged] = useState(false);
  const [auth, setAuth] = useState(false);
  const user = useSelector((state) => state.user);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (user.logged !== logged && user.logged) {
      setLogged(user.logged);
      dispatch(getProfile({ token: user.token }));
    }
    if (user.auth !== auth && user.auth) {
      setAuth(user.auth);
    }

    return () => {};
  }, [user, logged, auth]);

  const dispatch = useDispatch();
  const validate = () => {
    dispatch(loginCheck({ username: username, password: password }));
  };

  return (
    <Card>
      <Input placeholder="Username" onChange={handleUsernameChange} />
      <Input placeholder="Password" onChange={handlePasswordChange} />
      <Button buttonTitle="Connexion" action={validate} />
      {user?.token}
    </Card>
  );
};

export default LoginForm;
