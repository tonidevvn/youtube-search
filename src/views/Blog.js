import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { hashEncode, randomDate, truncate, useFetch } from "../services/utils";
import Hello from "../components/Hello";

function Blog() {
  const navigate = useNavigate();
  const { data, isLoading } = useFetch(process.env.REACT_APP_POSTS_API);
  const [latestData, setLatestData] = useState([]);

  useEffect(() => {
    setLatestData(data);
  }, [data]);

  const handleDelete = (id) => {
    console.log("🚀 ~ file: Blog.js:12 ~ handleDelete ~ id:", id);
    let newData = latestData.filter((e) => e.id !== id);
    setLatestData(newData);
  };

  return (
    <>
      <Hello />

      <h2>Blog page 📸</h2>

      <button
        className="btn btn-outline-primary"
        onClick={() => navigate("/new-post")}
      >
        Add a new post
      </button>

      {!!latestData && !isLoading ? (
        <div className="row mt-4">
          {latestData.map(({ id, title, body }) => {
            return (
              <div className="col-md-6" key={id}>
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                  <div className="col p-4 d-flex flex-column position-static">
                    <h3 className="mb-0 fs-5">{truncate(title, 42)}</h3>
                    <div className="mb-1 text-muted fst-italic">
                      {randomDate()}
                    </div>
                    <div className="card-text mb-auto fs-6">
                      {truncate(body, 142)}
                    </div>
                    <Link to={`/post/${hashEncode(id)}`}>Continue reading</Link>
                    <button
                      className="btn btn-link text-danger"
                      onClick={() => handleDelete(id)}
                    >
                      Delete
                    </button>
                  </div>
                  <div className="col-auto d-none d-lg-block">
                    <svg
                      className="bd-placeholder-img"
                      width="200"
                      height="250"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      aria-label="Placeholder: Thumbnail"
                      preserveAspectRatio="xMidYMid slice"
                      focusable="false"
                    >
                      <title>Placeholder</title>
                      <rect width="100%" height="100%" fill="#55595c"></rect>
                      <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                        Thumbnail
                      </text>
                    </svg>
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
}

export default Blog;
