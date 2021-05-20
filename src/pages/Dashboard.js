import React, { useContext, useState } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import Subheader from "../templates/Subheader";
import Header from "../templates/Header";
import Button from "../templates/Button";
import CardsComponent from "../components/CardsComponent";
import Text from "../templates/Text";
import DashboardModal from "../components/DashboardModal";
import LastArrivalsTable from "../components/LastArrivalsTable";
import IncrementButton from "../templates/IncrementButton";
import Card from "../templates/Card";
import { UsersDataContext } from "../App";
import { useEffect } from "react";
import LoadingComponent from "../components/LoadingComponent";
import DashboardBarChart from "../charts/DashboardBarChart";
import DashboardLineChart from "../charts/DashboardLineChart";
import DashboardHeatmap from "../charts/DashboardHeatmap";
import { DefUserContext } from "../providers/DefaultUserProvider";

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const usersData = useContext(UsersDataContext);

  //State
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [dashboardModalContent, setDashboardModalContent] = useState([]);
  const [arrivalsTableContent, setArrivalsTableContent] = useState([]);
  const [barGraphContent, setBarGraphContent] = useState([]);
  const [allArrivals, setAllArrivals] = useState([]);
  const [lineGraphContent, setLineGraphContent] = useState({});
  const [cardContent, setCardContent] = useState(null);
  const { defUser } = useContext(DefUserContext);

  //useEffect
  useEffect(() => {
    generateContent();
  }, [usersData]);

  //function to generate content for dashboard graphs, cards, etc.
  function generateContent() {
    let thisYearArrivalsCount = 0;
    let lastYearArrivalsCount = 0;
    let total = 0;
    let latest = 0;
    let monthLastYear = 0;
    let monthThisYear = 0;
    let latestArrivals = [];
    let barGraphData = [];
    let tmpAllarrivals = [];

    usersData.forEach((user) => {
      if (user.id !== "cahlik") {
        let userArrivalsEveryYear = { name: user.name };
        tmpAllarrivals = tmpAllarrivals.concat(user.arrivals);

        user.arrivals.forEach((arrival) => {
          if (user.id === defUser) {
            total++; //Counting total arrivals
            let nDate = new Date();

            if (arrival.toDate().getFullYear() === nDate.getFullYear()) {
              thisYearArrivalsCount++;
              if (arrival.toDate().getMonth() === nDate.getMonth()) monthThisYear++;
            }
            if (arrival.toDate().getFullYear() === nDate.getFullYear() - 1) {
              lastYearArrivalsCount++;
            }
            if (arrival.toDate().getFullYear() === nDate.getFullYear() - 1 && arrival.toDate().getMonth() === nDate.getMonth()) monthLastYear++;
            if (arrival > latest) latest = arrival;
          }

          //Getting data for bar graph
          let arrivalYear = arrival.toDate().getFullYear();
          userArrivalsEveryYear[arrivalYear] ? (userArrivalsEveryYear[arrivalYear] += 1) : (userArrivalsEveryYear[arrivalYear] = 1);

          //Latest arrivals table
          latestArrivals.push({
            member: user.name,
            date: arrival.toDate(),
            key: total,
          });
        });

        //Bar graph content
        barGraphData.push(userArrivalsEveryYear);
      }
    });

    //All arrivals - for Line Graph
    let categories = {};
    tmpAllarrivals.forEach((date) => {
      let tmpDate = date.toDate();
      if (categories[tmpDate.getFullYear()]) {
        categories[tmpDate.getFullYear()][tmpDate.getMonth()]++;
      } else {
        categories[tmpDate.getFullYear()] = {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
          8: 0,
          9: 0,
          10: 0,
          11: 0,
        };
        categories[tmpDate.getFullYear()][tmpDate.getMonth()]++;
      }
    });
    setLineGraphContent(categories);

    //Sort latest arrivals
    latestArrivals = latestArrivals.sort((a, b) => b.date - a.date);
    let date = latest.toDate().getDate() + "." + (latest.toDate().getMonth() + 1) + ".";

    //setters
    setAllArrivals(tmpAllarrivals);
    setDashboardModalContent(latestArrivals.slice()); // copy of array
    setArrivalsTableContent(latestArrivals);
    setBarGraphContent(barGraphData);
    setCardContent({
      thisYear: thisYearArrivalsCount,
      lastYear: lastYearArrivalsCount,
      yearDifferPercent: Math.floor((thisYearArrivalsCount * 100) / lastYearArrivalsCount),
      total: total,
      latest: date,
      monthLastYear: monthLastYear,
      monthThisYear: monthThisYear,
      monthDifferPercent: Math.floor(((monthThisYear === 0 ? 0 : monthThisYear) * 100) / (monthLastYear === 0 ? 1 : monthLastYear)),
    });
  }

  //Render
  return (
    <>
      {cardContent === null ? (
        <LoadingComponent />
      ) : (
        <div className={`min-h-screen bg-${theme}-bg`}>
          <div className={`p-4 min-h-screen bg-${theme}-bg mx-auto lg:w-1/3`}>
            <Header>Vítej zpět, {defUser === "tom" ? defUser + "e" : defUser}!</Header>
            <Text>Osobní statistiky</Text>

            {/* Cards */}
            <CardsComponent cardsData={cardContent} location="dashboard" />

            {/* Arrivals */}
            <Text>Statistiky všech členů</Text>
            <Card>
              <Subheader>Měsíční srovnání v jednotlivých letech</Subheader>
              <div className="w-full h-48 ">
                <DashboardLineChart data={lineGraphContent} />
              </div>
            </Card>

            {/* Individual arrivals */}
            <Card>
              <Subheader>Příchody členů</Subheader>
              <div className="w-full h-64">
                <DashboardBarChart data={barGraphContent} />
              </div>
            </Card>

            {/* Last arrivals */}
            <Card>
              <Subheader>Poslední příchody</Subheader>
              <LastArrivalsTable tableData={arrivalsTableContent} />

              {/* Last Arrivals Modal */}
              {/* <Text>Pro zobrazení historie příchodů a jejich správu, klikni na tlačítko níže.</Text> */}
              <Button btnStyle="expand-empty" clickFunction={() => setIsModalOpened(true)}>
                Správa/historie příchodů
              </Button>
              <DashboardModal isOpened={isModalOpened} setModalOpened={setIsModalOpened} modalData={dashboardModalContent} />
            </Card>

            {/* Heat mapa */}
            <Card>
              <Subheader>Heat mapa</Subheader>
              <Text>Intenzita příchodů za vybraný rok</Text>
              {/* Recent adding */}
              <div className={`w-full flex items-center justify-center text-center mt-4 text-${theme}-tsec`}>
                <div className="w-1/5">
                  <IncrementButton clickFunction={() => setSelectedYear(selectedYear - 1)}>-</IncrementButton>
                </div>
                <div className="w-3/5 text-2xl">
                  <p>{selectedYear}</p>
                </div>
                <div className="w-1/5">
                  <IncrementButton clickFunction={() => setSelectedYear(selectedYear + 1)}>+</IncrementButton>
                </div>
              </div>

              {/* Heatmap legend */}
              <div className="w-full flex justify-around px-10 my-5 text-center text-sm">
                <span>
                  <div className={`w-3 h-3 rounded-full bg-${theme}-heat mb-1`}></div> <span className={`text-${theme}-heat`}>0</span>
                </span>
                <span>
                  <div className="w-3 h-3 rounded-full bg-magma-1 mb-1"></div> <span className="text-magma-1">1</span>
                </span>
                <span>
                  <div className="w-3 h-3 rounded-full  bg-magma-2 mb-1"></div> <span className="text-magma-2">2</span>
                </span>
                <span>
                  <div className="w-3 h-3 rounded-full  bg-magma-3 mb-1"></div> <span className="text-magma-3">3</span>
                </span>
                <span>
                  <div className="w-3 h-3 rounded-full  bg-magma-4 mb-1"></div> <span className="text-magma-4">4</span>
                </span>
              </div>

              {/* Heatmap */}
              <div className="w-full flex items-center justify-center text-center">
                <DashboardHeatmap data={allArrivals} selectedYear={selectedYear} />
              </div>
            </Card>
            <div className="mb-20"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
