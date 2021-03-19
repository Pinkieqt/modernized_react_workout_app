import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import { UsersDataContext } from "../App";
import Header from "../templates/Header";
import PersonSelect from "../templates/PersonSelect";
import Text from "../templates/Text";
import { useToasts } from "react-toast-notifications";
import { DefUserContext } from "../providers/DefaultUserProvider";
import WeightEditModal from "../components/WeightEditModal";
import Exercises from "../helpfiles/Exercises";

const Weights = () => {
  const usersData = useContext(UsersDataContext);
  const { defUser } = useContext(DefUserContext);
  const { theme } = useContext(ThemeContext);
  const [defGroup, setDefGroup] = useState("all");
  const [isModalOpened, setModalOpened] = useState(false);
  const [modalData, setModalData] = useState({});
  const [cardsData, setCardsData] = useState([]);

  //Generate content everytime data changes
  useEffect(() => {
    const memberData = usersData.filter((member) => {
      return member.id === defUser;
    });

    //Generate cards data
    if (memberData) {
      let tmpCardsData = Exercises.map((exercise) => {
        if (exercise.category === defGroup || defGroup === "all") {
          let categoryColor = "";
          switch (exercise.category) {
            case "chest":
              categoryColor = "text-magma-1 bg-magma-1";
              break;
            case "arms":
              categoryColor = "text-magma-2 bg-magma-2";
              break;
            case "back":
              categoryColor = "text-magma-3 bg-magma-3";
              break;
            case "shoulders":
              categoryColor = "text-magma-4 bg-magma-4";
              break;
            default:
              //legs
              categoryColor = "text-magma-5 bg-magma-5";
          }

          let work = 0;
          let max = 0;

          //Members max and work weights
          memberData[0].exercisesData.forEach((element) => {
            if (element.key === exercise.key) {
              work = element.work;
              max = element.max;
            }
          });

          return (
            <div className="w-1/2 p-2" key={exercise.key}>
              <div
                className={`w-full h-full rounded-xl bg-${theme}-elev flex flex-col py-2 px-4`}
                onClick={() => {
                  setModalData({ key: exercise.key, work: work, max: max, label: exercise.label });
                  setModalOpened(true);
                }}
              >
                <p className={`text-xs ${categoryColor} font-semibold bg-opacity-20 px-2 py-1 rounded-full text-center uppercase`}>
                  {exercise.kategorie}
                </p>
                <p className={`text-${theme}-tpr my-2 text-lg font-semibold text-center`}>{exercise.label}</p>
                <div className="w-full flex flex-row justify-center text-center">
                  <div className="w-1/2 flex flex-col">
                    <p className={`text-${theme}-tsec text-lg`}>{max}</p>
                    <p className={`text-${theme}-tsec`}>max</p>
                  </div>
                  <div className="w-1/2 flex flex-col">
                    <p className={`text-${theme}-tsec  text-lg`}>{work}</p>
                    <p className={`text-${theme}-tsec`}>work</p>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      });

      setCardsData(tmpCardsData);
    }
  }, [usersData, defUser, defGroup]);

  // Render return
  return (
    <div className={`p-4 min-h-screen bg-${theme}-bg text-${theme}-tpr`}>
      <Header>Váhy cviků</Header>
      <Text>Vyber uživatele a uprav váhy kliknutím na kartu požadovaného cviku.</Text>
      <Text> Můžeš si také zobrazit pouze vybranou svalovou skupinu.</Text>

      {/* User Selector */}
      <div className="w-full flex flex-wrap justify-center ">
        <PersonSelect />

        {/* Muscle Group Select */}
        <select
          value={defGroup}
          onChange={(e) => setDefGroup(e.target.value)}
          className={`w-2/3 my-2 border bg-black bg-opacity-10 border-none text-${theme}-tsec text-base rounded-xl py-2  focus:outline-none focus:ring focus:ring-${theme}-primary`}
        >
          <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="all">
            Všechny partie
          </option>
          <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="legs">
            Nohy
          </option>
          <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="chest">
            Hrudník
          </option>
          <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="back">
            Záda
          </option>
          <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="shoulders">
            Ramena
          </option>
          <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="arms">
            Ruce
          </option>
        </select>
      </div>

      {/* Cards */}
      <div className="w-full flex flex-wrap justify-between mb-20">{cardsData}</div>

      {/* Modal */}
      <WeightEditModal isOpened={isModalOpened} setModalOpened={setModalOpened} modalData={modalData} />
    </div>
  );
};

export default Weights;
