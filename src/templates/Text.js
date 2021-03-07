import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const Text = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return <p className={`text-${theme}-tsec text-1xl my-3`}>{children}</p>;
};

export default Text;
