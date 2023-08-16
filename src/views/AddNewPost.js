import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { apiPost } from "../services/utils";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

function AddNewPost() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [newPost, setNewPost] = useState({
    id: "",
    title: "",
    content: "",
    userId: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = (post) => {
    setNewPost(post);
    setShow(true);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { title: "", content: "" } });

  const onSubmit = async (d) => {
    const data = await apiPost(process.env.REACT_APP_POST_API, {
      ...d,
      userId: 1,
    });

    console.log("🚀 ~ file: AddNewPost.js:20 ~ onSubmit ~ data:", data);

    toast.success(`🚀 A new post was created with id ${data.id}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    handleShow(data);

    reset({ title: "", content: "" });
  };

  const onInvalid = () => {
    if (!!errors) {
      toast.error("Title and content are required", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div className="container text-start">
        <h2>Create a new post</h2>
        <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <div className="mb-3 mt-3">
            <label className="mb-2" htmlFor="title">
              ✏️ Title
              {errors.title && (
                <span className="text-danger ms-2">❗ Required</span>
              )}
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              {...register("title", { required: true })}
              placeholder="Input the title of post here..."
            />
          </div>
          <div className="mb-3 mt-3">
            <label className="mb-2" htmlFor="content">
              ✏️ Content
              {errors.content && (
                <span className="text-danger  ms-2">❗ Required</span>
              )}
            </label>
            <textarea
              className="form-control"
              rows="5"
              id="content"
              {...register("content", { required: true })}
              placeholder="Input the content of post here..."
            ></textarea>
          </div>
          <button
            className="btn btn-light me-2"
            onClick={() => navigate("/blog")}
          >
            Back
          </button>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p>
              <strong>{newPost.title}</strong>
            </p>
            <p>{newPost.content}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddNewPost;
