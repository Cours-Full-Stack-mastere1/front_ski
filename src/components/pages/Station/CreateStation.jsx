import React from "react";
import styled from "styled-components";
import { Button, Card, Input } from "../../atoms";
import { useState } from "react";

const CreateStation = (props) => {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };
  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };

  const confirmWithValues = () => {
    props.confirm(name, latitude, longitude);
  };

  return (
    <Card>
      <h1>Créer une station</h1>
      <Input placeholder="Nom" onChange={handleNameChange} />
      <Input placeholder="Latitude" onChange={handleLatitudeChange} />
      <Input placeholder="Longitude" onChange={handleLongitudeChange} />
      <Button buttonTitle="Retour" action={props.cancel} />
      <Button buttonTitle="Confirmer" action={confirmWithValues} />
    </Card>
  );
};

export default CreateStation;
