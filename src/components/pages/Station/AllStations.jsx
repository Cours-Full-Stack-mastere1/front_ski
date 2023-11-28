import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { apiStation } from "../../../toolkit/api.config";
import axios from "axios";
import StationCard from "../../molecules/StationCard/StationCard";
import Station from "../Station/Station";
import { Button } from "../../atoms";
import styled from "styled-components";

const AllStations = () => {
  let AllStationsStyled = styled.div`
    width: 100%;
    height: 100%;
  `;
  let StyledStation = styled.div`
    width: 100%;
    height: 100%;
  `;

  const [datas, setDatas] = useState(false);
  const user = useSelector((state) => {
    return state.user;
  });

  const [selectedStation, setSelectedStation] = useState(null);
  const selectStation = (station) => {
    setSelectedStation(station);
  };
  const cancelStation = () => {
    setSelectedStation(null);
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

  useEffect(() => {
    getStations();
  }, []);

  return (
    <AllStationsStyled>
      {selectedStation == null ? <h1>Liste des stations</h1> : ""}
      {selectedStation == null ? (
        datas ? (
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
    </AllStationsStyled>
  );
};

export default AllStations;
