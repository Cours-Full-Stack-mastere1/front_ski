const apiStation = (method, path, data, token) => {
  const config = {
    baseUrl: "http://127.0.0.1:8000/api/",
    path: path,
    token: token,
  };

  let url = () => {
    return config.baseUrl + config.path;
  };

  let headers = () => {
    return config.token
      ? {
          Authorization: `Bearer ${config.token}`,
          "Content-Type": "application/json",
        }
      : {
          "Content-Type": "application/json",
        };
  };

  return {
    method: method,
    url: url(),
    headers: headers(),
    data: data,
  };
};
export { apiStation };
