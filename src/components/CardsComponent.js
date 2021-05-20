import React, { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const monthNames = ["lednu", "únoru", "březnu", "dubnu", "květnu", "červnu", "červenci", "srpnu", "září", "říjnu", "listopadu", "prosinci"];

const CardsComponent = ({ cardsData, location }) => {
  const { theme } = useContext(ThemeContext);

  //Function to get description of progressbar
  function getDescription(type) {
    let tDate = new Date();
    if (type === "year") {
      return cardsData.yearDifferPercent < 100
        ? "V roce " + tDate.getFullYear() + " máš méně příchodů než v roce minulém."
        : "Tento rok jsi na tom lépe, než v roce minulém.";
    } else {
      return cardsData.monthDifferPercent < 100
        ? "V " + monthNames[tDate.getMonth()] + " máš méně příchodů než v minulém roce."
        : "V " + monthNames[tDate.getMonth()] + " máš více příchodů než v minulém roce.";
    }
  }

  return (
    <>
      {location === "dashboard" ? (
        <div className="w-full flex flex-wrap justify-center items-center my-3">
          {/* third card */}
          <div className="w-1/2 py-2 pr-2">
            <div className={`w-full h-full bg-${theme}-elev text-${theme}-primary rounded-xl py-4 px-4 flex flex-col items-center`}>
              <p className="text-sm font-semibold mb-2 text-gray-600">tento rok</p>
              <p className="text-4xl">{cardsData.thisYear}</p>
              <div className={`w-full flex flex-row justify-between items-center text-xs text-${theme}-tsec`}>
                <span>0</span>
                <span>{cardsData.lastYear}</span>
              </div>
              <div className={`w-full h-2 flex flex-row justify-between bg-${theme}-primary bg-opacity-20 rounded-full mt-1`}>
                <div style={{ width: cardsData.yearDifferPercent + "%" }} className={`h-2 bg-${theme}-primary rounded-full`}></div>
              </div>
              <p className={`text-xs mt-2 text-${theme}-tsec`}>{getDescription("year")}</p>
            </div>
          </div>

          {/* fourth card */}
          <div className="w-1/2 py-2 pl-2">
            <div className={`w-full h-full bg-${theme}-elev text-${theme}-primary rounded-xl py-4 px-4 flex flex-col items-center`}>
              <p className="text-sm font-semibold mb-2 text-gray-600">tento měsíc</p>
              <p className="text-4xl">{cardsData.monthThisYear}</p>
              <div className={`w-full flex flex-row justify-between items-center text-xs text-${theme}-tsec`}>
                <span>0</span>
                <span>{cardsData.monthLastYear}</span>
              </div>
              <div className={`w-full h-2 flex flex-row justify-between bg-${theme}-primary bg-opacity-20 rounded-full mt-1 overflow-hidden`}>
                <div style={{ width: cardsData.monthDifferPercent + "%" }} className={`h-2 bg-${theme}-primary rounded-full`}></div>
              </div>
              <p className={`text-xs mt-2 text-${theme}-tsec`}>{getDescription("month")}</p>
            </div>
          </div>
          {/* First card */}
          <div className="w-1/2 py-2 pr-2">
            <div className={`w-full h-full bg-${theme}-elev text-${theme}-primary rounded-xl py-4 px-4 flex flex-col items-center`}>
              <p className="text-sm font-semibold mb-2 text-gray-600">celkem příchodů</p>
              <p className="text-4xl">{cardsData.total}</p>
            </div>
          </div>

          {/* Second card */}
          <div className="w-1/2 py-2 pl-2">
            <div className={`w-full h-full bg-${theme}-elev text-${theme}-primary rounded-xl py-4 px-4 flex flex-col items-center`}>
              <p className="text-sm font-semibold mb-2 text-gray-600">poslední příchod</p>
              <p className="text-4xl">{cardsData.latest}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-wrap justify-center items-center my-5">
          {/* First card */}
          <div className="w-1/2 py-2 pr-2">
            <div className={`w-full h-full bg-${theme}-elev text-${theme}-primary rounded-xl py-4 px-4 flex flex-col items-center`}>
              <p className="text-sm font-semibold mb-2 text-gray-600">max váha</p>
              <p className="text-4xl">{cardsData.max}</p>
            </div>
          </div>

          {/* Second card */}
          <div className="w-1/2 py-2 pl-2">
            <div className={`w-full h-full bg-${theme}-elev text-${theme}-primary rounded-xl py-4 px-4 flex flex-col items-center`}>
              <p className="text-sm font-semibold mb-2 text-gray-600">min váha</p>
              <p className="text-4xl">{cardsData.min}</p>
            </div>
          </div>

          {/* third card */}
          <div className="w-1/2 py-2 pr-2">
            <div className={`w-full h-full bg-${theme}-elev text-${theme}-primary rounded-xl py-4 px-4 flex flex-col items-center`}>
              <p className="text-sm font-semibold mb-2 text-gray-600">váhový průměr</p>
              <p className="text-4xl">{cardsData.avg}</p>
            </div>
          </div>

          {/* fourth card */}
          <div className="w-1/2 py-2 pl-2">
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
