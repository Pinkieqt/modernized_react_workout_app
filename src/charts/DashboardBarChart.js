import React from "react";
import { BarChart, Bar, XAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { ThemeContext } from "../providers/ThemeProvider";

const DashboardBarChart = ({ data }) => {
  const { theme } = React.useContext(ThemeContext);
  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      let tmp = [];
      for (let el in payload) {
        tmp.push(<p key={payload[el].dataKey} className={"m-3 text-xs"}>{`${payload[el].dataKey}: ${payload[el].value}`}</p>);
      }

      return (
        <div className={`bg-${theme}-bg text-${theme}-tpr text-center py-1 rounded-lg`}>
          <p>{label}</p>
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
    <ResponsiveContainer width="100%">
      <BarChart data={data} barGap="1" barSize={9}>
        <XAxis dataKey="name" tickLine={false} />
        {/* <YAxis /> */}
        <Tooltip content={<CustomTooltip />} />
        <Legend formatter={renderColorfulLegendText} align="center" iconSize="7" iconType="circle" />
        <Bar dataKey="2018" fill="#007AFF" radius={[40, 40, 40, 40]} />
        <Bar dataKey="2019" fill="#3EDDEF" radius={[40, 40, 40, 40]} />
        <Bar dataKey="2020" fill="#C8FF3A" radius={[40, 40, 40, 40]} />
        <Bar dataKey="2021" fill="#FBD16A" radius={[40, 40, 40, 40]} />
        {data[1][2022] > -1 && <Bar dataKey="2022" fill="#FF476C" radius={[40, 40, 40, 40]} />}
        {data[1][2023] > -1 && <Bar dataKey="2023" fill="#CF318A" radius={[40, 40, 40, 40]} />}
        {data[1][2024] > -1 && <Bar dataKey="2024" fill="#1B1A34" radius={[40, 40, 40, 40]} />}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DashboardBarChart;
