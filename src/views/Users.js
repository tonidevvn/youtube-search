import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useFetchUser } from "../services";

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

  const users = useFetchUser(1);

  return (
    <>
      {console.log("🚀 ~ file: Users.js:27 ~ Users ~ users:", users)}
      {!!users && (
        <>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {users.map((user) => {
              return (
                <div key={user.id} className="card card-user text-center">
                  <div className="card-body">
                    <h5 className="card-title">{user.first_name}</h5>
                    <p className="card-text">{user.email}</p>
                    <p>
                      <a
                        href="#"
                        onClick={() => handleShow(user)}
                        alt={user.first_name}
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
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{currentUser.first_name}'s information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <p>
                  {currentUser.first_name} {currentUser.last_name} @{" "}
                  <a href={`mailto:${currentUser.email}`} target="_blank">
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
      )}
    </>
  );
}

export default Users;
