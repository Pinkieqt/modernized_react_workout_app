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
          userColor = "text-green-500";
          break;
        case "Tom":
          userColor = "text-yellow-500";
          break;
        case "Dejvo":
          userColor = "text-blue-500";
          break;
        case "Luke":
          userColor = "text-red-500";
          break;
        default:
          userColor = "text-500-green";
      }

      return (
        <div key={index} className={`w-full flex justify-between text-${theme}-tsec py-2 px-5 `}>
          <div className={`w-1/3 `}>
            <p className={`text-${theme}-tsec flex flex-row items-center`}>
              <IoPersonOutline size="1.3em" className={`mr-2 ${userColor}`} />
              {element.name}
            </p>
          </div>
          <div className={`w-1/3 flex justify-end items-center text-${theme}-tsec`}>{element.date}</div>
        </div>
      );
    });
  }

  return <div className="w-full">{generateData()}</div>;
};

export default LastArrivalsTable;
