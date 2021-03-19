import React, { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import { IoSkullOutline } from "react-icons/io5";

const LastArrivalsTable = ({ tableData }) => {
  const { theme } = useContext(ThemeContext);

  //Function to generate/render data in modal
  function generateData() {
    return tableData.slice(0, 5).map((element, index) => {
      let userColor = "text-magma-1";
      let tmpDate = element.date.getDate() + "." + (element.date.getMonth() + 1) + ".";

      // Color of icon
      switch (element.member) {
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
              <IoSkullOutline size="1.5em" className={`mr-4 ${userColor}`} />
              {element.member}
            </p>
          </div>
          <div className={`w-1/3 flex justify-end items-center text-${theme}-tpr`}>{tmpDate}</div>
        </div>
      );
    });
  }

  return <div className="w-full">{generateData()}</div>;
};

export default LastArrivalsTable;
