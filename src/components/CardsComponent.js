import React from "react";

const CardsComponent = ({ cardsData }) => {
  return (
    <div className="w-full flex flex-wrap justify-center items-center my-5">
      {/* First card */}
      <div className="w-1/2 p-2">
        <div className="w-full h-full text-white bg-red-400 rounded-xl py-4 px-4 flex flex-col items-center">
          <p className="uppercase text-xs font-semibold mb-2">počet zapsání</p>
          <p className="text-4xl">675</p>
        </div>
      </div>

      {/* Second card */}
      <div className="w-1/2 p-2">
        <div className="w-full h-full text-white bg-yellow-400 rounded-xl py-4 px-4 flex flex-col items-center">
          <p className="uppercase text-xs font-semibold mb-2">počet zapsání</p>
          <p className="text-4xl">675</p>
        </div>
      </div>

      {/* third card */}
      <div className="w-1/2 p-2">
        <div className="w-full h-full text-white bg-green-400 rounded-xl py-4 px-4 flex flex-col items-center">
          <p className="uppercase text-xs font-semibold mb-2">počet zapsání</p>
          <p className="text-4xl">675</p>
        </div>
      </div>

      {/* fourth card */}
      <div className="w-1/2 p-2">
        <div className="w-full h-full text-white bg-blue-400 rounded-xl py-4 px-4 flex flex-col items-center">
          <p className="uppercase text-xs font-semibold mb-2">počet zapsání</p>
          <p className="text-4xl">675</p>
        </div>
      </div>
    </div>
  );
};

export default CardsComponent;
