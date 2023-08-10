import React from "react";

function Spinner() {
  return (
    <div
      className="d-flex justify-content-center align-items-center container-fluid "
      style={{ height: "120px" }}
    >
      <div className="spinner-border text-primary" role="status"></div>
      <span className="sr-only ms-2"> Loading...</span>
    </div>
  );
}

export default Spinner;
