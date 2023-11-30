import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { apiMeteo, apiStation } from "../../../toolkit/api.config";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "../../atoms";
import PisteCard from "../../molecules/PisteCard/PisteCard";
import styled from "styled-components";

const Station = (props) => {
  let StationStyled = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
  `;

  const CancelWrapper = styled.div`
    position: absolute;
    bottom: 0px;
    left: 0px;
  `;

  const UpdateWrapper = styled.div`
    position: absolute;
    bottom: 0px;
    right: 0px;
  `;

  const AddWrapper = styled.div`
    position: absolute;
    bottom: 0px;
    left: 25%;
    transform: translate(-25%, 0);
  `;

  const DeleteWrapper = styled.div`
    position: absolute;
    bottom: 0px;
    left: 75%;
    transform: translate(-75%, 0);
  `;

  const user = useSelector((state) => {
    return state.user;
  });
  const [pistes, setPistes] = useState(null);
  const [meteo, setMeteo] = useState(null);

  const getPistes = () => {
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
        setPistes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMeteo = () => {
    const config = apiMeteo(props.datas.gps);
    axios(config)
      .then((res) => {
        console.log(res.data);
        setMeteo(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPistes();
    getMeteo();
  }, []);

  //TODO: add map to see where is the station
  //TODO: ajouter la meteo
  //TODO: ajouter le nombre de pistes ouvertes
  //TODO: remplir un bouton pour supprimer la station
  //TODO: remplir un bouton pour ajouter une piste
  return (
    <StationStyled>
      <h1>Liste des pistes de {props.datas.nom}</h1>
      {pistes
        ? pistes.map((data) => <PisteCard key={data.id} pisteData={data} />)
        : "Pas encore de pistes pour cette station"}
      {/* Affichage des prévisions météorologiques */}
      {meteo ? (
        <div>
          <h2>Prévisions météorologiques pour {props.datas.nom}</h2>
          {meteo.forecast.map((forecastData, index) => (
            <div key={index}>
              <p>Date et heure : {forecastData.datetime}</p>
              <p>Vent : {forecastData.wind10m} km/h</p>
              <p>Précipitations : {forecastData.rr10} mm</p>
              {/* Ajoutez d'autres éléments à afficher selon vos besoins */}
            </div>
          ))}
        </div>
      ) : (
        <div>
          Pas de données météorologiques disponibles pour le moment.(Ou token
          error)
        </div>
      )}

      <CancelWrapper>
        <Button buttonTitle="Retour" action={props.cancel} />
      </CancelWrapper>
      <AddWrapper>
        <Button buttonTitle="Ajouter une piste" action={props.ajouter} />
      </AddWrapper>
      <DeleteWrapper>
        <Button buttonTitle="Supprimer la station" action={props.supprimer} />
      </DeleteWrapper>
      <UpdateWrapper>
        <Button buttonTitle="Modifier la station" action={props.modifier} />
      </UpdateWrapper>
    </StationStyled>
  );
};

export default Station;
