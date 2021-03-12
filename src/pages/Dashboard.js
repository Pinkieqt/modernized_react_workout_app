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

const Dashboard = () => {
  const { theme } = useContext(ThemeContext);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  return (
    <div className={`p-4 min-h-screen bg-${theme}-bg`}>
      <Header>Dashboard</Header>

      {/* Cards */}
      <CardsComponent />

      {/* Arrivals */}
      <Subheader>Příchody</Subheader>
      <Text>V grafu níže lze pozorovat měsíční srovnání příchodů v jednotlivých letech.</Text>

      {/* Individual arrivals */}
      <Text>Příchody jednotlivých členů</Text>

      {/* Last arrivals */}
      <Text>Poslední příchody</Text>
      <LastArrivalsTable />

      {/* Last Arrivals Modal */}
      <Text>Pro zobrazení historie příchodů a jejich správu, klikni na tlačítko níže.</Text>
      <Button btnStyle="expand-empty" clickFunction={() => setIsModalOpened(true)}>
        Správa/historie příchodů
      </Button>
      <DashboardModal isOpened={isModalOpened} setModalOpened={setIsModalOpened} />

      {/* Heat mapa */}
      <Subheader>Heat mapa</Subheader>
      <Text>Intenzita příchodů za vybraný rok</Text>
      {/* Recent adding */}
      <div className={`w-full flex items-center justify-center text-center mt-7 mb-7 text-${theme}-tsec`}>
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
      <div className="mb-20"></div>
    </div>
  );
};

export default Dashboard;
