import logo from "../assets/images/logo.svg";

export default function Logo() {
  return (
    <div style={{ display: "block", height: "80px", overflow: "hidden" }}>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}
