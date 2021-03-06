import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const Subheader = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return <h3 className={`text-${theme}-tsec text-2xl`}>{children}</h3>;
};

export default Subheader;
