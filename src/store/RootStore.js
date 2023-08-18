import { configureStore } from "@reduxjs/toolkit";
import colorModeSlice from "./reducers/ColorMode";
import usersSlice from "./reducers/Users";
import ytbVideosSlice from "./reducers/YtbVideos";

export default configureStore({
  reducer: {
    colorMode: colorModeSlice,
    users: usersSlice,
    ytbVideos: ytbVideosSlice,
  },
});
