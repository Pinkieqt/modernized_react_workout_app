import React, { useContext, useState } from "react";
import CardsComponent from "../components/CardsComponent";
import { ThemeContext } from "../providers/ThemeProvider";
import Header from "../templates/Header";
import PersonSelect from "../templates/PersonSelect";
import Text from "../templates/Text";
import IncrementButton from "../templates/IncrementButton";
import { IoCloseOutline } from "react-icons/io5";
import Card from "../templates/Card";
import Subheader from "../templates/Subheader";

const Metrics = () => {
  const { theme } = useContext(ThemeContext);
  const [currentPage, setCurrentPage] = useState(1);

  let dummyData = [
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.5555", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.5555", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.5555", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.5555", kg: 76.3 },
    { date: "23.03.5555", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.5555", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.5555", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
    { date: "23.03.5555", kg: 76.3 },
    { date: "23.03.1997", kg: 76.3 },
  ];

  //Function to delete item
  function deleteItem(index) {
    console.log(index);
  }

  //Function to get data
  function getRecentData() {
    return dummyData.slice(currentPage * 10 - 10, currentPage * 10).map((element, index) => {
      return (
        <div className={`w-full flex justify-around text-${theme}-tsec py-1 my-1`} key={index} onClick={() => deleteItem(index)}>
          <div className={`w-1/3 flex flex-col justify-center`}>
            <p className={`text-${theme}-primary text-lg`}>{element.kg}</p>
            <p className="text-sm">{element.date}</p>
          </div>
          <div className={`w-1/3 flex justify-end items-center text-${theme}-tter`}>
            <IoCloseOutline size="1.3em" />
          </div>
        </div>
      );
    });
  }

  return (
    <div className={`p-4 min-h-screen bg-${theme}-bg`}>
      <Header>Metriky</Header>
      <Text>Po vybrání uživatele se zobrazí váhové statistiky daného uživatele.</Text>

      <div className="w-full flex flex-col justify-center items-center">
        <PersonSelect />

        {/* Cards */}
        <CardsComponent />

        {/* Graph */}
        <div className="w-full h-52 bg-gray-800 rounded-xl mb-10 "></div>

        {/* Recent adding */}
        <Card>
          <Subheader>Tvé zápisy</Subheader>
          <div className={`w-full flex items-center justify-center text-center my-4 text-${theme}-tsec`}>
            <div className="w-1/5">
              <IncrementButton clickFunction={() => setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)}>-</IncrementButton>
            </div>
            <div className="w-3/5 text-xl">
              <p>{currentPage * 10 - 10 + " - " + currentPage * 10}</p>
            </div>
            <div className="w-1/5">
              <IncrementButton clickFunction={() => setCurrentPage(currentPage + 1)}>+</IncrementButton>
            </div>
          </div>

          {/* Recent Data */}
          {getRecentData()}
        </Card>
      </div>
      <div className="mb-20"></div>
    </div>
  );
};

export default Metrics;
