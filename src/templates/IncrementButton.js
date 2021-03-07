import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const IncrementButton = ({ children, clickFunction }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <button className={`w-10 h-10 bg-${theme}-primary bg-opacity-20 text-${theme}-primary rounded-full`} onClick={() => clickFunction()}>
      {children}
    </button>
  );
};

export default IncrementButton;
