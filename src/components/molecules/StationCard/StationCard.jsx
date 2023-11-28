import React from "react";
import Card from "../../atoms/Card/Card";
import { Button } from "../../atoms";
import { useState } from "react";
import { useSelector } from "react-redux";
import { apiStation } from "../../../toolkit/api.config";
import axios from "axios";

const StationCard = (props) => {
  const user = useSelector((state) => {
    return state.user;
  });
  const [isOpen, setIsOpen] = useState(false);
  const getOpen = () => {
    if (user?.auth !== true) {
      return <div>Vous devez être connecté pour voir les stations</div>;
    }

    const config = apiStation(
      "get",
      "station/" + props.datas.id + "/piste",
      {},
      user.token
    );
    axios(config)
      .then((res) => {
        setIsOpen(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const statusIndicator = isOpen ? (
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

  return (
    <Card>
      {statusIndicator}
      <h1> {props.stationData.nom}</h1>
      <p>{props.stationData.gps}</p>
      <Button buttonTitle="Voir la station" action={props.action} />
    </Card>
  );
};

export default StationCard;
