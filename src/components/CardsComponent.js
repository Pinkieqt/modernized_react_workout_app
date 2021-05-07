import React, { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const CardsComponent = ({ cardsData, location }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      {location === "dashboard" ? (
        <div className="w-full flex flex-wrap justify-center items-center my-3">
          {/* First card */}
          <div className="w-1/2 p-2">
            <div className={`w-full h-full bg-${theme}-elev text-${theme}-primary rounded-xl py-4 px-4 flex flex-col items-center`}>
              <p className="text-sm font-semibold mb-2 text-gray-600">celkem příchodů</p>
              <p className="text-4xl">{cardsData.total}</p>
            </div>
          </div>

          {/* Second card */}
          <div className="w-1/2 p-2">
            <div className={`w-full h-full bg-${theme}-elev text-${theme}-primary rounded-xl py-4 px-4 flex flex-col items-center`}>
              <p className="text-sm font-semibold mb-2 text-gray-600">poslední příchod</p>
              <p className="text-4xl">{cardsData.latest}</p>
            </div>
          </div>

          {/* third card */}
          <div className="w-1/2 p-2">
            <div className={`w-full h-full bg-${theme}-elev text-${theme}-primary rounded-xl py-4 px-4 flex flex-col items-center`}>
              <p className="text-sm font-semibold mb-2 text-gray-600">tento rok</p>
              <p className="text-4xl">{cardsData.thisYear}</p>
            </div>
          </div>

          {/* fourth card */}
          <div className="w-1/2 p-2">
            <div className={`w-full h-full bg-${theme}-elev text-${theme}-primary rounded-xl py-4 px-4 flex flex-col items-center`}>
              <p className="text-sm font-semibold mb-2 text-gray-600">rozdíl příchodů</p>
              <p className="text-4xl">{cardsData.monthDiffer}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-wrap justify-center items-center my-5">
          {/* First card */}
          <div className="w-1/2 p-2">
            <div className={`w-full h-full bg-${theme}-elev text-${theme}-primary rounded-xl py-4 px-4 flex flex-col items-center`}>
              <p className="text-sm font-semibold mb-2 text-gray-600">max váha</p>
              <p className="text-4xl">{cardsData.max}</p>
            </div>
          </div>

          {/* Second card */}
          <div className="w-1/2 p-2">
            <div className={`w-full h-full bg-${theme}-elev text-${theme}-primary rounded-xl py-4 px-4 flex flex-col items-center`}>
              <p className="text-sm font-semibold mb-2 text-gray-600">min váha</p>
              <p className="text-4xl">{cardsData.min}</p>
            </div>
          </div>

          {/* third card */}
          <div className="w-1/2 p-2">
            <div className={`w-full h-full bg-${theme}-elev text-${theme}-primary rounded-xl py-4 px-4 flex flex-col items-center`}>
              <p className="text-sm font-semibold mb-2 text-gray-600">váhový průměr</p>
              <p className="text-4xl">{cardsData.avg}</p>
            </div>
          </div>

          {/* fourth card */}
          <div className="w-1/2 p-2">
            <div className={`w-full h-full bg-${theme}-elev text-${theme}-primary rounded-xl py-4 px-4 flex flex-col items-center`}>
              <p className="text-sm font-semibold mb-2 text-gray-600">počet zapsání</p>
              <p className="text-4xl">{cardsData.len}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardsComponent;
