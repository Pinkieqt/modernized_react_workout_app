import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const Button = ({ children, btnStyle, clickFunction }) => {
  const { theme } = useContext(ThemeContext);

  let fullStyle = `w-1/3 bg-${theme}-primary text-white mx-4 my-2 text-lg p-3 rounded-xl`;
  let emptyStyle = `w-1/3  text-${theme}-primary mx-4 my-2 text-lg p-3 rounded-xl`;
  let expandEmpty = `w-full text-${theme}-primary my-2 text-lg p-3 rounded-xl`;
  let expandFull = `w-full bg-${theme}-primary text-white my-2 text-lg p-3 rounded-xl`;

  function classStyle() {
    switch (btnStyle) {
      case "full":
        return fullStyle;
      case "empty":
        return emptyStyle;
      case "expand-full":
        return expandFull;
      case "expand-empty":
        return expandEmpty;
      default:
        return expandEmpty;
    }
  }

  return (
    <button className={classStyle()} onClick={() => clickFunction()}>
      {children}
    </button>
  );
};

export default Button;
