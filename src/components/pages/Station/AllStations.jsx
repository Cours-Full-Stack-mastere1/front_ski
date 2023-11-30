import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { apiStation } from "../../../toolkit/api.config";
import axios from "axios";
import StationCard from "../../molecules/StationCard/StationCard";
import Station from "../Station/Station";
import { Button } from "../../atoms";
import styled from "styled-components";
import CreateStation from "../Station/CreateStation";
import { Input } from "../../atoms";

const AllStations = () => {
  let AllStationsStyled = styled.div`
    width: 100%;
    height: 100%;
  `;
  let StyledStation = styled.div`
    width: 100%;
    height: 100%;
  `;
  const AddWrapper = styled.div`
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 0);
  `;
  const ConfirmWrapper = styled.div`
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 0);
  `;

  const [datas, setDatas] = useState(false);
  const user = useSelector((state) => {
    return state.user;
  });

  const [selectedStation, setSelectedStation] = useState(null);
  const [addStation, setAddStation] = useState(false);
  const addStationForm = () => {
    setAddStation(true);
  };

  const [filtreName, setFiltreName] = useState("");
  const handleNameChange = (e) => {
    setFiltreName(e.target.value);
    getStations();
  };

  const selectStation = (station) => {
    setSelectedStation(station);
  };
  const cancelStation = () => {
    setSelectedStation(null);
    setAddStation(false);
    getStations();
  };

  const getStations = () => {
    if (user?.auth !== true) {
      return <div>Vous devez être connecté pour voir les stations</div>;
    }

    const config = apiStation("get", "station", {}, user.token);
    axios(config)
      .then((res) => {
        setDatas(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createStation = (nom, latitude, longitude) => {
    if (user?.auth !== true) {
      return <div>Vous devez être connecté pour voir les stations</div>;
    }

    const config = apiStation(
      "post",
      "station" + (filtreName !== "" ? "/search?nom=" + filtreName : ""),
      { nom: nom, gps: latitude + "," + longitude },
      user.token
    );
    axios(config)
      .then((res) => {
        cancelStation();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStations();
  }, []);

  return (
    <AllStationsStyled>
      {selectedStation == null ? (
        addStation ? (
          <CreateStation cancel={cancelStation} confirm={createStation} />
        ) : (
          <div>
            <h1>Liste des stations</h1>
            <Input
              placeholder="Filtre par nom"
              onChange={handleNameChange}
              value={filtreName}
            />
          </div>
        )
      ) : (
        ""
      )}
      {selectedStation == null ? (
        addStation ? (
          ""
        ) : datas ? (
          datas.map((data) => (
            <StationCard
              key={data.id}
              action={() => selectStation(data)}
              stationData={data}
            />
          ))
        ) : (
          "Pas encore de stations"
        )
      ) : (
        <StyledStation>
          <Station cancel={cancelStation} datas={selectedStation} />
        </StyledStation>
      )}
      {selectedStation == null ? (
        addStation ? (
          ""
        ) : (
          <AddWrapper>
            <Button buttonTitle="Ajouter une station" action={addStationForm} />
          </AddWrapper>
        )
      ) : (
        ""
      )}
    </AllStationsStyled>
  );
};

export default AllStations;
