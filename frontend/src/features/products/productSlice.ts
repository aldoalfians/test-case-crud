import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";

interface Category {
  id: number;
  name: string;
  active: boolean;
}

interface User {
  role: string;
}

interface ProductResponse {
  uuid: string;
  plu: string;
  name: string;
  category: Category;
  user: User;
}

interface ProductState {
  products: ProductResponse[];
  product: ProductResponse | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  isDelete: boolean;
  message: string;
}

const initialState: ProductState = {
  products: [],
  product: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isDelete: false,
  message: "",
};

export const fetchProducts = createAsyncThunk<
  ProductState,
  void,
  { state: RootState }
>("products/fetch", async (_, { getState }) => {
  try {
    const { auth } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.userToken}`,
      },
    };
    const response = await axios.get(
      "http://localhost:5506/api/products",
      config
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (uuid: string, { getState }) => {
    const { auth } = getState() as RootState;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.userToken}`,
      },
    };
    try {
      const response = await axios.get(
        `http://localhost:5506/api/products/${uuid}`,
        config
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postProduct = createAsyncThunk<
  ProductResponse,
  { plu: string; name: string; categoryId: number },
  { state: RootState }
>("products/post", async ({ plu, name, categoryId }, { getState }) => {
  const { auth } = getState();
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth.userToken}`,
    },
  };
  try {
    const response = await axios.post(
      "http://localhost:5506/api/products",
      {
        plu,
        name,
        categoryId,
      },
      config
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (uuid: string, { getState }) => {
    const { auth } = getState() as RootState;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.userToken}`,
      },
    };
    try {
      const response = await axios.delete(
        `http://localhost:5506/api/products/${uuid}`,
        config
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/edit",
  async ({ uuid, values }: { uuid: string; values: any }, { getState }) => {
    const { auth } = getState() as RootState;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.userToken}`,
      },
    };
    try {
      const response = await axios.put(
        `http://localhost:5506/api/products/${uuid}`,
        values,
        config
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    // Get User Login
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<ProductState>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      }
    );
    builder.addCase(fetchProducts.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "Error";
    });

    builder.addCase(fetchProductById.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchProductById.fulfilled,
      (state, action: PayloadAction<ProductState>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      }
    );
    builder.addCase(fetchProductById.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "Error";
    });

    builder.addCase(postProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postProduct.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(postProduct.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "Error";
    });

    builder.addCase(deleteProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.isDelete = true;
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "Error";
    });

    builder.addCase(editProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editProduct.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(editProduct.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
      state.message = "Error";
    });
  },
});

export const { reset } = productsSlice.actions;
export default productsSlice.reducer;
