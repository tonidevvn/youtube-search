import React, { useEffect, useState } from "react";
import { fetchPost, hashDecode, randomDate, stopFetching } from "../services";
import { Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

function Post(props) {
  const [post, setPost] = useState([]);
  const { id } = useParams();

  let navigate = useNavigate();
  let date = props.date || randomDate();

  useEffect(() => {
    // A new instance of the AbortController is created before making the API request
    const controller = new AbortController();
    fetchPost(controller.signal, hashDecode(id)).then((res) => setPost(res));

    return () => {
      console.log("component will unmount!!!");
      // cancel request
      stopFetching(controller);
    };
  }, []);

  return (
    <div className="container">
      {!!post ? (
        <div className="row">
          <div className="col-md-8">
            <div className="p-4 mb-3">
              <h2>👋 {post.title}</h2>
              <p className="text-center fw-light fst-italic">{date}</p>
              <div>{post.body}</div>
              <a href="#" onClick={() => navigate(-1)}>
                Back
              </a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="position-sticky" style={{ top: "2rem" }}>
              <div className="p-4 mb-3 bg-light rounded">
                <h4 className="fst-italic">About Toni</h4>
                <p className="mb-0">
                  I have a passion for developing websites that showcase my
                  creativity. I love the adventure of finding caches and
                  connecting with new people who have the same interest.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default Post;
