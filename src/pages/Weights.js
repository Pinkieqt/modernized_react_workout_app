import React, { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import Header from "../templates/Header";

const Weights = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`p-4 min-h-screen bg-${theme}-bg text-${theme}-tpr`}>
      <Header>Váhy cviků</Header>
      <button className="bg-red-200">show modal</button>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
      <p>sda</p>
    </div>
  );
};

export default Weights;
