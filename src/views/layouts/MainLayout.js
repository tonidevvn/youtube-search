import React from "react";
import BsNavbar from "../BsNavbar";
import Logo from "../../components/Logo";
import { Outlet, useNavigation } from "react-router-dom";
import Spinner from "../../components/Spinner";

function MainLayout() {
  const navigation = useNavigation();

  return (
    <div className="App">
      <header className="App-header">
        <BsNavbar />
      </header>
      <div className="App-body container py-5">
        {navigation.state === "loading" ? <Spinner /> : <Outlet />}
      </div>
      <div className="App-footer">
        <Logo />
      </div>
    </div>
  );
}

export default MainLayout;
