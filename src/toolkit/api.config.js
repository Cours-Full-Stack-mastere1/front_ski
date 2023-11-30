const apiStation = (method, path, data, token) => {
  const config = {
    baseUrl: "http://localhost:8000/api/",
    path: path,
    token: token,
  };

  let url = () => {
    return config.baseUrl + config.path;
  };

  let headers = () => {
    let baseHeaders = {
      "Content-Type": "application/json",
    };

    if (config.token) {
      baseHeaders["Authorization"] = `Bearer ${config.token}`;
    }

    baseHeaders["Access-Control-Allow-Origin"] = "*";

    return baseHeaders;
  };

  return {
    method: method,
    url: url(),
    headers: headers(),
    data: data,
  };
};

const apiMeteo = (gps) => {
  const config = {
    baseUrl: "https://api.meteo-concept.com/api",
    path: "/forecast/daily",
    token: "76ad4022fcd2abf5e6e1dc9e85c8721dec2173e046d7e76f765b5ca3663221fd",
    latlng: gps,
    world: true,
  };

  let url = () => {
    return (
      config.baseUrl +
      config.path +
      "?token=" +
      config.token +
      "&latlng=" +
      config.latlng +
      "&world=" +
      config.world
    );
  };

  let headers = () => {
    let baseHeaders = {
      /* "Content-Type": "application/json", */
    };

    return baseHeaders;
  };

  return {
    method: "get",
    url: url(),
    headers: headers(),
  };
};
export { apiStation, apiMeteo };
