import { createSlice } from "@reduxjs/toolkit";

export const colorModeSlice = createSlice({
  name: "colorModeSlice",
  initialState: {
    value: "light",
  },
  reducers: {
    toogle: (state) => {
      if (state.value == "light") {
        state.value = "dark";
        // reset html data-bs-theme
        document.documentElement.setAttribute("data-bs-theme", "dark");
      } else {
        state.value = "light";
        // reset html data-bs-theme
        document.documentElement.setAttribute("data-bs-theme", "light");
      }
    },
    light: (state) => {
      state.value = "light";
    },
    dark: (state) => {
      state.value = "dark";
    },
  },
});

export const { toogle, light, dark } = colorModeSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectColorMode = (state) => state.colorMode.value;

export default colorModeSlice.reducer;
