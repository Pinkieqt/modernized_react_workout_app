import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const Text = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return <h3 className={`text-${theme}-tsec text-1xl`}>{children}</h3>;
};

export default Text;
