import youtube from "../services/youtube";
import React, { useEffect, useRef, useState, useTransition } from "react";
import LoadingBar from "react-top-loading-bar";
import { sleep } from "../services/utils";
import { YTVideosList } from "../components/YTVideosList";
import { useDispatch, useSelector } from "react-redux";
import { add, selectYtbVideos } from "../store/reducers/YtbVideos";

function YoutubeSearch() {
  const [isPending, startTransition] = useTransition();
  const ytbVideos = useSelector(selectYtbVideos);
  const dispatch = useDispatch();

  const [isError, setIsError] = useState(false);
  const [progress, setProgress] = useState(0);
  const YtbVideosList = useRef();

  const handleChange = (event) => {
    dispatch(add({ ...ytbVideos, q: event.target.value }));
  };

  const handleSearch = () => {
    startTransition(async () => {
      try {
        console.log(">>> startTransition");
        setProgress(Math.floor(Math.random() * 30) + 10);
        setIsError(false);

        YtbVideosList.current.setIsLoading(true);

        console.log(">>> 1");
        const res = await youtube.get("/search", {
          params: {
            q: ytbVideos.q,
          },
        });
        await sleep(1000); // a little delay before loading disappear
        console.log(">>> 2");
        console.log(res.data.items);
        dispatch(add({ ...ytbVideos, videos: res.data.items }));
        YtbVideosList.current.setIsLoading(false);
        setProgress(100);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
      console.log(">>> end startTransition");
    });
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

  useEffect(() => {
    // at load isPending = false
    // after start tranisition it is set to false
    // but it never returns back to false
    console.log("is pending ? ", isPending);
  }, [isPending]);

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
          disabled={isPending}
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
