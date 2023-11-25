import { apiStation } from "../toolkit/api.config";
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
  const config = apiStation("get", `user`, {}, payload?.token);
  const response = await axios(config)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });

  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: false,
    user: {},
    logged: false,
    auth: false,
    status: "idle",
    error: null,
    admin: false,
    message: "",
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginCheck.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginCheck.fulfilled, (state, action) => {
        if (action?.payload?.data?.hasOwnProperty("token")) {
          state.status = "succeed";

          state.logged = true;
          state.token = action.payload.data.token;
        } else {
          state.logged = false;
          state.status = "failed";
        }
      })
      .addCase(loginCheck.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.request.response;
      })
      .addCase(getProfile.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.status = "succeed";
        state.auth = true;
        state.admin = action.payload.data.roles.includes("ADMIN");
        state.user = action.payload.data;
        state.username = action.payload.data.username;

        // if (action?.payload?.hasOwnProperty("data")) {
        //   state.user = action.payload.data;
        //   //Do
        // }
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.request.response;
      });
  },
});

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
