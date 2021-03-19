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

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const usersData = useContext(UsersDataContext);

  //State
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [dashboardModalContent, setDashboardModalContent] = useState([]);
  const [arrivalsTableContent, setArrivalsTableContent] = useState([]);
  const [barGraphContent, setBarGraphContent] = useState([]);
  const [cardContent, setCardContent] = useState(null);

  //useEffect
  useEffect(() => {
    generateContent();
  }, [usersData]);

  //function to generate content for dashboard graphs, cards, etc.
  function generateContent() {
    let thisYear = 0;
    let total = 0;
    let latest = 0;
    let monthLastYear = 0;
    let monthThisYear = 1;
    let latestArrivals = [];
    let barGraphData = [];

    usersData.forEach((user) => {
      let userArrivalsEveryYear = { name: user.name };

      user.arrivals.forEach((arrival) => {
        total++; //Counting total arrivals
        let nDate = new Date();

        if (arrival.toDate().getFullYear() === nDate.getFullYear()) {
          thisYear++;
          if (arrival.toDate().getMonth() === nDate.getMonth()) monthThisYear++;
        }
        if (arrival.toDate().getFullYear() === nDate.getFullYear() - 1 && arrival.toDate().getMonth() === nDate.getMonth()) monthLastYear++;
        if (arrival > latest) latest = arrival;

        //Latest arrivals table
        latestArrivals.push({
          member: user.name,
          date: arrival.toDate(),
          key: total,
        });

        //Getting data for bar graph
        let arrivalYear = arrival.toDate().getFullYear();
        userArrivalsEveryYear[arrivalYear] ? (userArrivalsEveryYear[arrivalYear] += 1) : (userArrivalsEveryYear[arrivalYear] = 1);
      });

      //Bar graph content
      barGraphData.push(userArrivalsEveryYear);
    });

    //Sort latest arrivals
    latestArrivals = latestArrivals.sort((a, b) => b.date - a.date);

    let date = latest.toDate().getDate() + "." + (latest.toDate().getMonth() + 1) + ".";

    //setters
    setDashboardModalContent(latestArrivals.slice()); // copy of array
    setArrivalsTableContent(latestArrivals);
    setBarGraphContent(barGraphData);
    setCardContent({
      thisYear: thisYear,
      total: total,
      latest: date,
      monthDiffer: monthThisYear - monthLastYear - 1,
    });
  }

  //Render
  return (
    <>
      {cardContent === null ? (
        <LoadingComponent />
      ) : (
        <div className={`p-4 min-h-screen bg-${theme}-bg`}>
          <Header>Dashboard</Header>

          {/* Cards */}
          <CardsComponent cardsData={cardContent} location="dashboard" />

          {/* Arrivals */}
          <Card>
            <Subheader>Měsíční srovnání v jednotlivých letech</Subheader>
          </Card>

          {/* Individual arrivals */}
          <Card>
            <Subheader>Příchody jednotlivých členů</Subheader>
          </Card>

          {/* Last arrivals */}
          <Card>
            <Subheader>Poslední příchody</Subheader>
            <LastArrivalsTable tableData={arrivalsTableContent} />

            {/* Last Arrivals Modal */}
            <Text>Pro zobrazení historie příchodů a jejich správu, klikni na tlačítko níže.</Text>
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
            <div className={`w-full flex items-center justify-center text-center mt-4 mb-4 text-${theme}-tsec`}>
              <div className="w-1/5">
                <IncrementButton clickFunction={() => setSelectedYear(selectedYear - 1)}>-</IncrementButton>
              </div>
              <div className="w-3/5 text-xl">
                <p>{selectedYear}</p>
              </div>
              <div className="w-1/5">
                <IncrementButton clickFunction={() => setSelectedYear(selectedYear + 1)}>+</IncrementButton>
              </div>
            </div>
          </Card>
          <div className="mb-20"></div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
