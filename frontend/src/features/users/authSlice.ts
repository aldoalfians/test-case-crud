import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

export interface userResponse {
  uuid: string;
  name: string;
  username: string;
  role: string;
  token: string;
}

export interface AuthState {
  user: userResponse | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  userToken: string | null;
}

const user: any = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user") as any)
  : null;

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState: AuthState = {
  user,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  userToken,
};

export const LoginUser = createAsyncThunk<
  AuthState,
  { username: string; password: string }
>("auth/LoginUser", async ({ username, password }) => {
  try {
    const response = await axios.post("http://localhost:5506/api/login", {
      username,
      password,
    });
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("userToken", response.data.token);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getMe = createAsyncThunk<AuthState, void, { state: RootState }>(
  "auth/getMe",
  async (_, { getState }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.userToken}`,
        },
      };
      const response = await axios.get("http://localhost:5506/api/me", config);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      LoginUser.fulfilled,
      (state, action: PayloadAction<AuthState>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.userToken = action.payload.userToken;
      }
    );
    builder.addCase(LoginUser.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "Error";
    });

    // Get User Login
    builder.addCase(getMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getMe.fulfilled,
      (state, action: PayloadAction<AuthState>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
      }
    );
    builder.addCase(getMe.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "Error";
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
