import React from "react";
import Months from "../helpfiles/Months";
import { LineChart, Line, XAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ThemeContext } from "../providers/ThemeProvider";

const DashboardLineChart = ({ data }) => {
  const { theme } = React.useContext(ThemeContext);
  function getLines() {
    let result = Months;

    for (let entry in data) {
      for (let month in data[entry]) {
        result[month][entry] = data[entry][month];
      }
    }
    return result;
  }

  const graphData = getLines();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      let tmp = [];
      for (let el in payload) {
        tmp.push(<p key={payload[el].dataKey} className={"m-3 text-xs"}>{`${payload[el].dataKey}: ${payload[el].value}`}</p>);
      }

      return (
        <div className={`bg-${theme}-bg text-${theme}-tpr text-center py-1 rounded-lg`}>
          <p>{payload[0].payload.label}</p>
          {tmp}
        </div>
      );
    }
    return null;
  };

  function renderColorfulLegendText(value, entry) {
    const { color } = entry;

    return (
      <span style={{ color }} className={`text-xs text-${theme}-tsec`}>
        {value}
      </span>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={graphData}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="ab" tickLine={false} tick={{ fontSize: 14 }} interval={1} />
        {/* <YAxis /> */}
        <Tooltip content={<CustomTooltip />} />
        <Legend formatter={renderColorfulLegendText} align="center" iconSize="7" iconType="circle" />

        {graphData[0][2018] > -1 && <Line type="monotone" dataKey="2018" stroke="#007AFF" strokeWidth={3} dot={false} />}
        {graphData[0][2019] > -1 && <Line type="monotone" dataKey="2019" stroke="#3EDDEF" strokeWidth={3} dot={false} />}
        {graphData[0][2020] > -1 && <Line type="monotone" dataKey="2020" stroke="#C8FF3A" strokeWidth={3} dot={false} />}
        {graphData[0][2021] > -1 && <Line type="monotone" dataKey="2021" stroke="#FBD16A" strokeWidth={3} dot={false} />}
        {graphData[0][2022] > -1 && <Line type="monotone" dataKey="2022" stroke="#FF476C" strokeWidth={3} dot={false} />}
        {graphData[0][2023] > -1 && <Line type="monotone" dataKey="2023" stroke="#CF318A" strokeWidth={3} dot={false} />}
        {graphData[0][2024] > -1 && <Line type="monotone" dataKey="2024" stroke="#CF318A" strokeWidth={3} dot={false} />}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DashboardLineChart;
