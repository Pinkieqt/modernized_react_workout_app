import React, { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const CardsComponent = ({ cardsData }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="w-full flex flex-wrap justify-center items-center my-5">
      {/* First card */}
      <div className="w-1/2 p-2">
        <div className={`w-full h-full bg-${theme}-elev text-${theme}-primary rounded-xl py-4 px-4 flex flex-col items-center`}>
          <p className="text-sm font-semibold mb-2 text-gray-600">celkem příchodů</p>
          <p className="text-4xl">675</p>
        </div>
      </div>

      {/* Second card */}
      <div className="w-1/2 p-2">
        <div className={`w-full h-full bg-${theme}-elev text-${theme}-primary rounded-xl py-4 px-4 flex flex-col items-center`}>
          <p className="text-sm font-semibold mb-2 text-gray-600">rozdíl příchodů</p>
          <p className="text-4xl">113</p>
        </div>
      </div>

      {/* third card */}
      <div className="w-1/2 p-2">
        <div className={`w-full h-full bg-${theme}-elev text-${theme}-primary rounded-xl py-4 px-4 flex flex-col items-center`}>
          <p className="text-sm font-semibold mb-2 text-gray-600">tento rok</p>
          <p className="text-4xl">1</p>
        </div>
      </div>

      {/* fourth card */}
      <div className="w-1/2 p-2">
        <div className={`w-full h-full bg-${theme}-elev text-${theme}-primary rounded-xl py-4 px-4 flex flex-col items-center`}>
          <p className="text-sm font-semibold mb-2 text-gray-600">poslední příchod</p>
          <p className="text-4xl">88</p>
        </div>
      </div>
    </div>
  );
};

export default CardsComponent;
