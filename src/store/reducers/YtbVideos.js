import { createSlice } from "@reduxjs/toolkit";

export const ytbVideosSlice = createSlice({
  name: "ytbVideosSlice",
  initialState: {
    q: "",
    videos: [],
  },
  reducers: {
    add: (state, action) => {
      if (!!action.payload) {
        state.q = action.payload.q;
        state.videos = [...action.payload.videos];
      }
    },
    clear: (state) => {
      state.value = [];
    },
  },
});

export const { add, clear } = ytbVideosSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectYtbVideos = (state) => state.ytbVideos;

export default ytbVideosSlice.reducer;
