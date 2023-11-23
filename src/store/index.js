import apiStation from "../toolkit/api.config";
import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios from "axios";

export const loginCheck = createAsyncThunk("user/login", async (payload) => {
  const config = apiStation("post", `login_check`, payload, null);
  const response = await axios(config)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

  return response;
});
export const getProfile = createAsyncThunk("user/profile", async (payload) => {
  const config = apiStation("get", `profile`, {}, payload?.token);
  const response = await axios(config)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

  return response;
});
