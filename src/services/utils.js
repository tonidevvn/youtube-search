import axios from "axios";
import { useEffect, useState } from "react";
import Hashids from "hashids";

const hashids = new Hashids("", 4);

export const hashEncode = (input) => {
  return hashids.encode(input);
};

export const hashDecode = (input) => {
  return hashids.decode(input);
};

export const randomDate = () => {
  const start = new Date(new Date().getFullYear().toString());
  const end = new Date();

  const randDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );

  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return month[randDate.getMonth()] + " " + randDate.getFullYear();
};

export const truncate = (words, maxlength) => {
  return `${words.slice(0, maxlength)} …`;
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// A new instance of the AbortController is created before making the API request
let controller = new AbortController();

export const useFetch = (url, timeOut = 200) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [isError, setIsError] = useState([]);

  console.log(`call reqres to fetch data from ${url}...`);

  useEffect(() => {
    async function fetchData() {
      try {
        // cancel request
        stopFetching(controller);
        // A new instance of the AbortController is created before making the API request
        controller = new AbortController();

        const result = await axios.get(url, { signal: controller.signal });
        setData(result.data);
        console.log("🚀 ~ file: index.js:62 ~ fetchData ~ tmp:", data);
        await sleep(timeOut);
        setIsLoading(false);

        return () => {
          console.log("component will unmount!!!");
          // cancel request
          stopFetching(controller);
        };
      } catch (error) {
        setIsError(true);
      }
    }
    fetchData();
  }, []);

  return { data, isLoading, isError };
};

export const apiPost = async (url, payload, timeOut = 200) => {
  let data = null;

  console.log(`call reqres to post a payload to ${url}...`);

  try {
    // cancel request
    stopFetching(controller);
    // A new instance of the AbortController is created before making the API request
    controller = new AbortController();

    const result = await axios.post(url, payload, {
      signal: controller.signal,
    });
    data = result.data;
    console.log("🚀 ~ file: utils.js:82 ~ usePost ~ data:", data);
    await sleep(timeOut);
  } catch (error) {
    console.log("🚀 ~ file: utils.js:101 ~ apiPost ~ error:", error);
  }

  return data;
};

export const stopFetching = (controller) => {
  if (controller) {
    // cancel the request
    controller.abort();
    console.log("Cancel fetching request and stop receiving data...");
  }
};
