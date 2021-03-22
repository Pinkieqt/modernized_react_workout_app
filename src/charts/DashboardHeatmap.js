import React, { useEffect } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

const DashboardHeatmap = ({ data, selectedYear }) => {
  const { theme } = React.useContext(ThemeContext);

  // Watch for selectedYear change
  useEffect(() => {
    generateContent();
  }, [selectedYear]);

  // Function to generate content for heatmap
  function generateContent() {
    let days = {}; //0-364

    // get days
    for (let i = 1; i <= 12; i++) {
      let day = new Date(selectedYear, i, 0).getDate();
      for (let j = 1; j <= day; j++) {
        let pushDay = j.toString() + "_" + i.toString();
        //days.push({ date: new Date(selectedYear, i, j, 12, 0, 0, 0), count: 0 });
        days[pushDay] = 0;
      }
    }

    //count arrivals
    data.forEach((element) => {
      let date = element.toDate();
      if (date.getFullYear() === selectedYear) {
        days[date.getDate().toString() + "_" + (date.getMonth() + 1).toString()]++;
      }
    });

    return Object.keys(days).map((element, index) => {
      let color = "bg-magma-" + days[element];
      if (days[element] === 0) color = "bg-" + theme + "-heat";

      return (
        <div
          key={index}
          className={`w-3 h-3 ${color} rounded-full m-0.5`}
          onClick={() => alert("Dne " + element + "_" + selectedYear + ": " + days[element])}
        ></div>
      );
    });
  }

  return <div className="w-full flex flex-wrap justify-center items-center">{generateContent()}</div>;
};

export default DashboardHeatmap;
