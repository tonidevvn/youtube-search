import { configureStore } from "@reduxjs/toolkit";
import colorModeSlice from "./reducers/ColorMode";
import usersSlice from "./reducers/Users";

export default configureStore({
  reducer: {
    colorMode: colorModeSlice,
    users: usersSlice,
  },
});
