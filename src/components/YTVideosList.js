import React, { forwardRef, useImperativeHandle, useState } from "react";
import YTVideo from "./YTVideo";
import moment from "moment";
import { decode } from "html-entities";
import { useSelector } from "react-redux";
import { selectYtbVideos } from "../store/reducers/YtbVideos";
import { Spinner } from "react-bootstrap";

const YTVideoPlaceholder = () => {
  return (
    <>
      <div className="my-4">
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4 placeholder-glow">
              <svg
                className="bd-placeholder-img placeholder"
                width="100%"
                height="260"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
              >
                <title>...</title>
                <rect width="100%" height="100%" fill="#868e96"></rect>
              </svg>
            </div>
            <div
              className="col-md-8 position-relative "
              style={{ minHeight: "260px" }}
            >
              <div className="card-body">
                <h4 className="card-title placeholder-glow">
                  <span className="placeholder col-12"></span>
                </h4>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-10"></span>
                </p>
                <p className="card-text placeholder-glow">
                  <span className="placeholder col-8"></span>
                  <span className="placeholder col-6"></span>
                </p>
              </div>
              <div className="card-footer position-absolute bottom-0 start-0 end-0 placeholder-glow">
                <span className="placeholder col-8"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const YTVideosList = forwardRef((props, ref) => {
  const ytbVideos = useSelector(selectYtbVideos);
  const [isLoading, setIsLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    setIsLoading(_isloading) {
      setIsLoading(_isloading);
    },
  }));

  return (
    <>
      {!isLoading ? (
        <div>
          {!!ytbVideos.videos &&
            ytbVideos.videos.map((video, index) => {
              return (
                <div className="my-4" key={index}>
                  <div className="card mb-3">
                    <div className="row g-0">
                      <div className="col-md-4 bg-secondary bg-gradient">
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
        </div>
      ) : (
        <>
          <YTVideoPlaceholder />
          <YTVideoPlaceholder />
          <YTVideoPlaceholder />
          <Spinner />
        </>
      )}
    </>
  );
});
