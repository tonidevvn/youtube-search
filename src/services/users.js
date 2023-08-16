import axios from "axios";
import { add, clear, selectUsers } from "../store/reducers/Users";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { stopFetching } from "./utils";

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
            }, 500);
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
