import React from "react";
import styled from "styled-components";
import { Button, Card, Input } from "../../atoms";
import { useState } from "react";

const CreatePiste = (props) => {
  const [name, setName] = useState("");
  const [couleur, setCouleur] = useState("");
  const [longeur, setLongeur] = useState("");
  const [ouvert, setOuvert] = useState(false);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleCouleurChange = (e) => {
    setCouleur(e.target.value);
  };
  const handleLongeurChange = (e) => {
    setLongeur(e.target.value);
  };
  const handleOuvertChange = () => {
    setOuvert(!ouvert);
  };

  const confirmWithValues = () => {
    props.confirm(name, couleur, longeur, ouvert);
  };

  return (
    <Card>
      <h1>Créer une piste</h1>
      <Input placeholder="Nom" onChange={handleNameChange} />
      <Input placeholder="Couleur" onChange={handleCouleurChange} />
      <Input placeholder="Longeur" onChange={handleLongeurChange} />
      <span>Ouverte?</span>
      <Input
        placeholder="Ouvert"
        type="checkbox"
        onChange={handleOuvertChange}
      />
      <Button buttonTitle="Retour" action={props.cancel} />
      <Button buttonTitle="Confirmer" action={confirmWithValues} />
    </Card>
  );
};

export default CreatePiste;
