import youtube from "../services/youtube";
import React, { useState } from "react";
import moment from "moment";
import { Spinner } from "react-bootstrap";
import YTVideo from "../components/YTVideo";
import { decode } from "html-entities";
import { sleep } from "../services/utils";

function YoutubeSearch() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      setIsError(false);
      setIsLoading(true);
      const res = await youtube.get("/search", {
        params: {
          q: query,
        },
      });
      setVideos(res.data.items);
      console.log(videos);
      await sleep(500);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
    }
  };

  return (
    <div className="container">
      <h2>Youtube Search Video (demo) 👌</h2>
      <div className="input-group">
        <input
          type="text"
          name="video-query"
          className="form-control p-2"
          placeholder="Searching by keywords"
          value={query}
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
        {!!videos && !isLoading ? (
          <>
            {videos.map((video, index) => {
              return (
                <div className="my-4" key={index}>
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4">
                        <YTVideo
                          src={`https://www.youtube.com/embed/${video.id.videoId}`}
                          title={decode(video.snippet.title)}
                        />
                      </div>
                      <div
                        className="col-md-8 position-relative "
                        style={{ minHeight: "260px" }}
                      >
                        <div className="card-body">
                          <h4 className="card-title">
                            {decode(video.snippet.title)}
                          </h4>
                          <p className="card-text text-muted">
                            {decode(video.snippet.channelTitle)}
                          </p>
                          <p className="card-text">
                            {video.snippet.description}
                          </p>
                        </div>
                        <div className="card-footer position-absolute bottom-0 start-0 end-0">
                          <small className="text-muted">
                            Last updated{" "}
                            {moment(video.snippet.publishTime).fromNow()}
                          </small>
                        </div>
                        <a
                          href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                          title={decode(video.snippet.channelTitle)}
                          className="stretched-link"
                          target="_blank"
                          rel="noreferrer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ) : !isError ? (
          <Spinner />
        ) : (
          <h3>Something went wrong. Please try this function later.</h3>
        )}
      </div>
    </div>
  );
}

export default YoutubeSearch;
