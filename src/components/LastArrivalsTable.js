import React, { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import { IoPersonOutline } from "react-icons/io5";

const LastArrivalsTable = ({ tableData }) => {
  const { theme } = useContext(ThemeContext);

  let dummyData = [
    { name: "Dudu", date: "23.04." },
    { name: "Luke", date: "23.04." },
    { name: "Tom", date: "23.04." },
    { name: "Dejvo", date: "23.04." },
    { name: "Dudu", date: "23.04." },
    { name: "Dudu", date: "23.04" },
    { name: "Dudu", date: "23.04" },
    { name: "Dudu", date: "23.04" },
    { name: "Dudu", date: "23.04" },
  ];

  //Function to generate/render data in modal
  function generateData() {
    return dummyData.slice(0, 5).map((element, index) => {
      let userColor = "text-green-500";

      // Color of icon
      switch (element.name) {
        case "Dudu":
          userColor = "text-magma-2";
          break;
        case "Tom":
          userColor = "text-magma-3";
          break;
        case "Dejvo":
          userColor = "text-magma-4";
          break;
        case "Luke":
          userColor = "text-magma-5";
          break;
        default:
          userColor = "text-magma-1";
      }

      return (
        <div key={index} className={`w-full flex justify-between text-${theme}-tsec py-2 px-5 `}>
          <div className={`w-1/3 `}>
            <p className={`text-${theme}-tpr flex flex-row items-center`}>
              <IoPersonOutline size="1.5em" className={`mr-2 ${userColor}`} />
              {element.name}
            </p>
          </div>
          <div className={`w-1/3 flex justify-end items-center text-${theme}-tpr`}>{element.date}</div>
        </div>
      );
    });
  }

  return <div className="w-full">{generateData()}</div>;
};

export default LastArrivalsTable;
