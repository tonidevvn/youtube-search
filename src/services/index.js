import axios from "axios";
import { add, clear, selectUsers } from "../store/reducers/Users";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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
  console.log("🚀 ~ file: Blog.js:10 ~ randomDate ~ start:", start);

  const end = new Date();
  console.log("🚀 ~ file: Blog.js:13 ~ randomDate ~ end:", end);

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

export const fetchPosts = async (signal) => {
  const url = "https://jsonplaceholder.typicode.com/posts/?_limit=10";
  console.log(`call reqres to fetch posts from ${url}...`);
  const result = await axios.get(url, { signal });
  return result.data;
};

export const fetchPost = async (signal, id) => {
  const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
  console.log(`call reqres to fetch post from ${url}...`);
  const result = await axios.get(url, { signal });
  return result.data;
};

export const useFetchUser = (page = 1) => {
  const dispatch = useDispatch();
  let data = useSelector(selectUsers);

  useEffect(() => {
    // Declare result
    let result = [];
    // A new instance of the AbortController is created before making the API request
    const controller = new AbortController();
    try {
      const pageNo = !!page ? page : 1;
      const url = `https://reqres.in/api/users?page=${pageNo}`;

      console.log(`call reqres to fetch users data from ${url}...`);

      axios
        .get(url, { signal: controller.signal })
        .then(function (response) {
          result = response.data.data;
          console.log("🚀 ~ file: index.js:26 ~ result:", result);
          if (!!result) {
            setTimeout(() => {
              dispatch(add(result)); // trigger to store by redux
            }, 1000);
          }
        })
        .catch((error) => {
          // Check the exception is was caused request cancellation
          if (axios.isCancel(error)) {
            // handle cancelation error
            console.log("🚀 ~ file: index.js:30 ~ getUsers ~ error:", error);
          } else {
            // handle other error
            console.log("🚀 ~ file: index.js:30 ~ getUsers ~ error#:", error);
          }
        });
    } catch (error) {
      console.log("🚀 ~ file: index.js:11 ~ getUsers ~ error:", error);
    }

    // tricky test cancel request
    // stopFetching(controller);

    return () => {
      console.log("component will unmount!!!");
      // cancel request
      stopFetching(controller);
      dispatch(clear());
    };
  }, []);

  return data;
};

export const stopFetching = (controller) => {
  if (controller) {
    // cancel the request
    controller.abort();
    console.log("Cancel fetching request and stop receiving data...");
  }
};
