import axios from "axios";
import { add, selectUsers } from "../store/reducers/Users";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export async function getUsers(page = 1) {
  let result = [];
  try {
    let pageNo = !!page ? page : 1;
    const res = await axios.get(`https://reqres.in/api/users?page=${pageNo}`);
    result = res.data.data;
    console.log(result);
  } catch (error) {
    console.log("🚀 ~ file: index.js:11 ~ getUsers ~ error:", error);
  }
  return result;
}

export const useFetchUser = (page = 1) => {
  const dispatch = useDispatch();
  let data = useSelector(selectUsers);

  useEffect(() => {
    async function fetchData() {
      data = await getUsers(page);
      console.log("🚀 ~ file: index.js:45 ~ fetchData ~ data:", data);
      if (!!data) dispatch(add(data)); // trigger to store by redux
    }

    fetchData();
  }, []);

  return data;
};
