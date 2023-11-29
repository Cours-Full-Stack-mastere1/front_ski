import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { apiStation } from "../../../toolkit/api.config";
import axios from "axios";
import { useEffect } from "react";
import { Button } from "../../atoms";
import PisteCard from "../../molecules/PisteCard/PisteCard";
import styled from "styled-components";
import CreatePiste from "../Piste/CreatePiste";
import MapComponent from "../../molecules/MapComponent/MapComponent";

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

  const [addPiste, setAddPiste] = useState(false);
  const addPisteForm = () => {
    setAddPiste(true);
  };

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

  const cancelPiste = () => {
    setAddPiste(false);
    getPistes();
  };

  const deleteStation = () => {
    if (user?.auth !== true) {
      return <div>Vous devez être connecté supprimer une station</div>;
    }

    const config = apiStation(
      "delete",
      "station/" + props.datas.id,
      {},
      user.token
    );
    axios(config)
      .then((res) => {
        console.log(res);
        props.cancel();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createPiste = (nom, couleur, ouvert, longeur) => {
    if (user?.auth !== true) {
      return <div>Vous devez être connecté pour voir les stations</div>;
    }

    const config = apiStation(
      "post",
      "station/" + props.datas.id + "/piste",
      {
        nom: nom,
        couleur: couleur,
        ouvert: ouvert,
        longeur: longeur,
        temps: [],
      },
      user.token
    );
    axios(config)
      .then((res) => {
        cancelPiste();
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
  return (
    <StationStyled>
      {addPiste ? (
        <CreatePiste cancel={cancelPiste} confirm={createPiste} />
      ) : (
        ""
      )}
      {addPiste ? "" : <h1>Informations de la station</h1>}
      {addPiste ? (
        ""
      ) : (
        <MapComponent
          latitude={props.datas.gps.split(",")[0]}
          longitude={props.datas.gps.split(",")[1]}
          name={props.datas.nom}
        />
      )}
      {addPiste
        ? ""
        : pistes
        ? pistes.map((data) => (
            <PisteCard
              key={data.id}
              stationId={props.datas.id}
              refresh={getPistes}
              pisteData={data}
            />
          ))
        : "Pas encore de pistes pour cette station"}
      {addPiste ? (
        ""
      ) : (
        <div>
          <CancelWrapper>
            <Button buttonTitle="Retour" action={props.cancel} />
          </CancelWrapper>
          <AddWrapper>
            <Button buttonTitle="Ajouter une piste" action={addPisteForm} />
          </AddWrapper>
          <DeleteWrapper>
            <Button buttonTitle="Supprimer la station" action={deleteStation} />
          </DeleteWrapper>
          <UpdateWrapper>
            <Button buttonTitle="Modifier la station" action={props.modifier} />
          </UpdateWrapper>
        </div>
      )}
    </StationStyled>
  );
};

export default Station;
