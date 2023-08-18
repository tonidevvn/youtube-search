import youtube from "../services/youtube";
import React, { useEffect, useRef, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { sleep } from "../services/utils";
import { YTVideosList } from "../components/YTVideosList";
import { useDispatch, useSelector } from "react-redux";
import { add, selectYtbVideos } from "../store/reducers/YtbVideos";

function YoutubeSearch() {
  const ytbVideos = useSelector(selectYtbVideos);
  console.log(
    "🚀 ~ file: YoutubeSearch.js:11 ~ YoutubeSearch ~ ytbVideos:",
    ytbVideos
  );

  const dispatch = useDispatch();

  const [isError, setIsError] = useState(false);
  const [progress, setProgress] = useState(0);
  const YtbVideosList = useRef();

  const handleChange = (event) => {
    dispatch(add({ ...ytbVideos, q: event.target.value }));
  };

  const handleSearch = async () => {
    try {
      setProgress(Math.floor(Math.random() * 30) + 10);
      setIsError(false);
      YtbVideosList.current.setIsLoading(true);
      const res = await youtube.get("/search", {
        params: {
          q: ytbVideos.q,
        },
      });
      console.log(res.data.items);
      dispatch(add({ ...ytbVideos, videos: res.data.items }));
      await sleep(1500); // a little delay before loading disappear
      YtbVideosList.current.setIsLoading(false);
      setProgress(100);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  useEffect(() => {
    async function updateLoadingBar() {
      if (progress < 100 && progress > 0) {
        let tmp = Math.floor(Math.random() * 10) + 10;
        await sleep(200);
        setProgress(progress + tmp);
      }
    }
    updateLoadingBar();
  }, [progress]);

  return (
    <div className="container">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <h2>Youtube Search Video (demo) 👌</h2>
      <div className="input-group">
        <input
          type="text"
          name="video-query"
          className="form-control p-2"
          placeholder="Searching by keywords"
          value={ytbVideos.q}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleSearch}
        >
          🔍 Search
        </button>
      </div>

      <div className="container py-4">
        {!isError ? (
          <YTVideosList ref={YtbVideosList} />
        ) : (
          <h3>Something went wrong. Please try this function later.</h3>
        )}
      </div>
    </div>
  );
}

export default YoutubeSearch;
