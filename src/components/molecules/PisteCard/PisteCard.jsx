import React from "react";
import Card from "../../atoms/Card/Card";
import { Button } from "../../atoms";

const PisteCard = (props) => {
  console.log(props);

  const statusIndicator = (isOpen) => {
    return isOpen ? (
      <div
        style={{
          width: "15px",
          height: "15px",
          borderRadius: "50%",
          backgroundColor: "green",
        }}
      ></div>
    ) : (
      <div
        style={{
          width: "15px",
          height: "15px",
          borderRadius: "50%",
          backgroundColor: "red",
        }}
      ></div>
    );
  };

  //TODO: Add a button to delete the piste
  //TODO: Add a button to update the piste
  return (
    <Card>
      {statusIndicator(props.pisteData.ouvert)}
      <h1>{props.pisteData.nom}</h1>
      <p>{props.pisteData.difficulte}</p>
      <p>{props.pisteData.longeur} kms</p>
      <p> Difficulte: {props.pisteData.couleur}</p>
      <Button buttonTitle="Supprimer la piste" action={props.action} />
      <Button buttonTitle="Modifier la piste" action={props.action} />
    </Card>
  );
};

export default PisteCard;
