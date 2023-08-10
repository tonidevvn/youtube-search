import { ReactComponent as LightToogleIco } from "../assets/images/lightToogle.svg";
import { ReactComponent as DarkToogleIco } from "../assets/images/darkToogle.svg";
import { useDispatch, useSelector } from "react-redux";
import { selectColorMode, toogle } from "../store/reducers/ColorMode";

function ToogleModeColor() {
  const colorMode = useSelector(selectColorMode);
  const dispatch = useDispatch();

  return (
    <>
      <div className="ms-1 colorModeToogle">
        <button
          type="button"
          className="d-flex justify-content-center align-items-center colorModeToogleBtn"
          onClick={() => dispatch(toogle())}
          title="Switch between dark and light mode"
        >
          {colorMode === "dark" ? <LightToogleIco /> : <DarkToogleIco />}
        </button>
      </div>
    </>
  );
}

export default ToogleModeColor;
