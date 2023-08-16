import React from "react";
import { Spinner } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import AuthorBio from "../components/AuthorBio";
import { hashDecode, randomDate, useFetch } from "../services/utils";

function Post(props) {
  const { id } = useParams();
  const url = process.env.REACT_APP_POST_API + hashDecode(id);
  const { data: post, isLoading } = useFetch(url);
  let navigate = useNavigate();
  let date = props.date || randomDate();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="p-4 mb-3">
            {!!post && !isLoading ? (
              <>
                <h2>👋 {post.title}</h2>
                <p className="text-center fw-light fst-italic">{date}</p>
                <div>{post.body}</div>
              </>
            ) : (
              <Spinner />
            )}

            <a href="#" onClick={() => navigate(-1)}>
              Back
            </a>
          </div>
        </div>
        <div className="col-md-4">
          <div className="position-sticky" style={{ top: "2rem" }}>
            <div className="p-4 mb-3 bg-light rounded">
              <h4 className="fst-italic">About Toni</h4>
              <div className="mb-0">
                <AuthorBio />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
