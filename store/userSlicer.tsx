import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
interface currnetUser {
  currentUser: {
    authObj: null;
    createdAt: string;
    name: string;
    phone: string;
    _id: string;
    updatedAt: string;
  };
}
const initialState: currnetUser = {
  currentUser: {
    authObj: null,
    createdAt: "",
    name: "",
    phone: "",
    _id: "",
    updatedAt: "",
  },
};

export const userSlicer = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<currnetUser>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setUser } = userSlicer.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.currentUser;

export default userSlicer.reducer;
