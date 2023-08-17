import React from "react";

function YTVideo(props) {
  return (
    <iframe
      className="w-100 h-100"
      src={props.src || "https://www.youtube.com/embed/wJnBTPUQS5A"}
      title={props.title || "Youtube title"}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
}

export default YTVideo;
