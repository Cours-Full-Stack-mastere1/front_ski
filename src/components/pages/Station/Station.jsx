import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { apiStation } from "../../../toolkit/api.config";
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

  useEffect(() => {
    getPistes();
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

      <CancelWrapper>
        <Button buttonTitle="Retour" action={props.cancel} />
      </CancelWrapper>
      <AddWrapper>
        <Button buttonTitle="Ajouter une piste" action={props.ajouter} />
      </AddWrapper>
      <DeleteWrapper>
        <Button buttonTitle="Supprimer" action={props.supprimer} />
      </DeleteWrapper>
      <UpdateWrapper>
        <Button buttonTitle="Modifier" action={props.modifier} />
      </UpdateWrapper>
    </StationStyled>
  );
};

export default Station;
