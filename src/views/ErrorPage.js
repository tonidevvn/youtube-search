import { useRouteError } from "react-router-dom";
import MyNavbar from "../components/Navbar";
import Logo from "../components/Logo";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="App">
      <header className="App-header">
        <MyNavbar />
      </header>
      <div className="App-body">
        <div id="error-page">
          <h1>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      </div>
      <div className="App-footer">
        <Logo />
      </div>
    </div>
  );
}
