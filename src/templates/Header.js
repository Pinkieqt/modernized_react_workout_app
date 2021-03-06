import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const Header = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return <h1 className={`text-${theme}-tpr font-bold text-3xl`}>{children}</h1>;
};

export default Header;
