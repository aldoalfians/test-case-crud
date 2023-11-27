import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

interface User {
  role: string;
}

interface CategoryResponse {
  uuid: string;
  name: string;
  user: User;
}

interface CategoryState {
  categories: CategoryResponse[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: CategoryState = {
  categories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const fetchCategories = createAsyncThunk<
  CategoryState,
  void,
  { state: RootState }
>("category/fetch", async (_, { getState }) => {
  try {
    const { auth } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.userToken}`,
      },
    };
    const response = await axios.get(
      "http://localhost:5506/api/category",
      config
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const postCategory = createAsyncThunk<
  CategoryResponse,
  { name: string },
  { state: RootState }
>("category/post", async ({ name }, { getState }) => {
  try {
    const { auth } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.userToken}`,
      },
    };
    const response = await axios.post(
      "http://localhost:5506/api/category",
      {
        name,
      },
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    // Get User Login
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchCategories.fulfilled,
      (state, action: PayloadAction<CategoryState>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.categories = action.payload;
      }
    );
    builder.addCase(fetchCategories.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "Error";
    });

    builder.addCase(postCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postCategory.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(postCategory.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "Error";
    });
  },
});

export const { reset } = categorySlice.actions;
export default categorySlice.reducer;
