import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const Header = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return <h1 className={`text-${theme}-tpr font-bold text-2xl uppercase`}>{children}</h1>;
};

export default Header;
