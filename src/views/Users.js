import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useFetchUser } from "../services/users";
import Spinner from "../components/Spinner";

function Users() {
  const [show, setShow] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    avatar: "",
  });

  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    setShow(true);
    setCurrentUser(user);
  };

  const users = useFetchUser();

  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center">
      {!!users && users.length > 0 ? (
        <>
          {users.map((user) => {
            return (
              <div
                key={user.id}
                className="card text-center m-1 position-relative"
                style={{ width: "23.3%" }}
              >
                <div className="card-body">
                  <h5 className="card-title">{user.first_name}</h5>
                  <p className="card-text">{user.email}</p>
                  <p>
                    <a
                      href="#"
                      onClick={() => handleShow(user)}
                      alt={user.first_name}
                      className="stretched-link"
                    >
                      <img
                        src={user.avatar}
                        style={{ width: "80px", borderRadius: "4px" }}
                        alt={user.first_name}
                      />
                    </a>
                  </p>
                </div>
              </div>
            );
          })}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{currentUser.first_name}'s information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <p>
                  {currentUser.first_name} {currentUser.last_name} @{" "}
                  <a
                    href={`mailto:${currentUser.email}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {currentUser.email}
                  </a>
                </p>
                <p>
                  <img
                    src={currentUser.avatar}
                    style={{ width: "80px", borderRadius: "4px" }}
                    alt={currentUser.first_name}
                    title={currentUser.first_name}
                  />
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default Users;
