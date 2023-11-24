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
export { apiStation };
