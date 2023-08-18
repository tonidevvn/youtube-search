import React, { forwardRef, useImperativeHandle, useState } from "react";
import YTVideo from "./YTVideo";
import moment from "moment";
import { decode } from "html-entities";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectYtbVideos } from "../store/reducers/YtbVideos";

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
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
});
