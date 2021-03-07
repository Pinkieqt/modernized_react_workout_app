import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const Button = ({ children, btnStyle, clickFunction }) => {
  const { theme } = useContext(ThemeContext);

  let fullStyle = `w-1/3 bg-${theme}-primary text-white mx-4 my-2 text-lg p-3 rounded-xl`;
  let emptyStyle = `w-1/3  text-${theme}-primary mx-4 my-2 text-lg p-3 rounded-xl`;

  return (
    <button className={btnStyle === "full" ? fullStyle : emptyStyle} onClick={() => clickFunction()}>
      {children}
    </button>
  );
};

export default Button;
