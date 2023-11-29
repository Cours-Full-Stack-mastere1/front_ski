import React from "react";
import Card from "../../atoms/Card/Card";
import { Button } from "../../atoms";
import { useSelector } from "react-redux";
import { apiStation } from "../../../toolkit/api.config";
import axios from "axios";

const PisteCard = (props) => {
  const user = useSelector((state) => {
    return state.user;
  });

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

  const deletePiste = () => {
    if (user?.auth !== true) {
      return <div>Vous devez être connecté supprimer une station</div>;
    }

    const config = apiStation(
      "delete",
      "station/" + props.stationId + "/piste/" + props.pisteData.id,
      {},
      user.token
    );
    axios(config)
      .then((res) => {
        props.refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card>
      {statusIndicator(props.pisteData.ouvert)}
      <h1>{props.pisteData.nom}</h1>
      <p>{props.pisteData.difficulte}</p>
      <p>{props.pisteData.longeur} kms</p>
      <p>Temps moyen: {props.pisteData.temps}</p>
      <p> Difficulte: {props.pisteData.couleur}</p>
      <Button buttonTitle="Supprimer la piste" action={deletePiste} />
      <Button buttonTitle="Modifier la piste" action={props.action} />
    </Card>
  );
};

export default PisteCard;
