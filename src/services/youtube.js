import axios from "axios";

const API_KEY = "YOUR_API_KEY_FROM_GOOGLE_APIS_SERVICES";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    maxResults: 5,
    key: API_KEY,
    type: "video",
  },
});
