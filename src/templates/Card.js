import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const Card = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  return <div className={`w-full flex flex-col p-4 bg-${theme}-elev rounded-xl mb-5`}>{children}</div>;
};

export default Card;
