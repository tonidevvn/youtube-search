import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "usersSlice",
  initialState: {
    value: [],
  },
  reducers: {
    add: (state, action) => {
      if (!!action.payload) {
        state.value = [...action.payload];
      }
    },
    clear: (state) => {
      state.value = [];
    },
  },
});

export const { add, clear } = usersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUsers = (state) => state.users.value;

export default usersSlice.reducer;
