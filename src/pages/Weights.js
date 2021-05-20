import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { ThemeContext } from "../providers/ThemeProvider";
import { UsersDataContext } from "../App";
import Header from "../templates/Header";
import Text from "../templates/Text";
import { DefUserContext } from "../providers/DefaultUserProvider";
import WeightEditModal from "../components/WeightEditModal";
import Exercises from "../helpfiles/Exercises";
import { Listbox } from "@headlessui/react";
import { IoCheckmarkOutline, IoChevronDownOutline } from "react-icons/io5";

const options = [
  { keyval: "all", name: "Všechny partie" },
  { keyval: "legs", name: "Nohy" },
  { keyval: "chest", name: "Hrudník" },
  { keyval: "back", name: "Záda" },
  { keyval: "shoulders", name: "Ramena" },
  { keyval: "arms", name: "Ruce" },
];

const Weights = () => {
  const usersData = useContext(UsersDataContext);
  const { defUser } = useContext(DefUserContext);
  const { theme } = useContext(ThemeContext);
  const [defGroup, setDefGroup] = useState(options[0]);
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
        if (exercise.category === defGroup.keyval || defGroup.keyval === "all") {
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
                className={`w-full h-full rounded-xl bg-${theme}-elev flex flex-col py-2 px-4 cursor-pointer`}
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
    <div className={`min-h-screen bg-${theme}-bg`}>
      <div className={`p-4 min-h-screen bg-${theme}-bg mx-auto lg:w-1/3 text-${theme}-tpr`}>
        <Header>Váhy cviků</Header>
        <Text>Váhy lze upravit kliknutím na kartu požadovaného cviku.</Text>
        <Text>Můžeš si také zobrazit pouze vybranou svalovou skupinu.</Text>

        {/* User Selector */}
        <div className="w-full flex flex-wrap justify-center ">
          {/* <PersonSelect /> */}

          {/* Muscle Group Select */}
          <div className="w-2/3 mb-2">
            <Listbox value={defGroup} onChange={setDefGroup}>
              <div className="relative mt-1">
                <Listbox.Button
                  className={`w-full flex flex-row justify-between items-center px-5 py-2 border bg-black bg-opacity-10 border-none text-${theme}-tsec rounded-xl`}
                >
                  <span>{defGroup.name}</span>
                  <span>
                    <IoChevronDownOutline size="1.4em" />
                  </span>
                </Listbox.Button>
                <Listbox.Options
                  className={`absolute w-full px-5 py-1 mt-1 overflow-auto bg-${theme}-bg text-${theme}-tsec rounded-xl shadow-lg ring-1 ring-${theme}-primary`}
                >
                  {options.map((el) => (
                    <Listbox.Option key={el.keyval} value={el} className="mb-1 cursor-default select-none relative py-2 pl-10 pr-4">
                      {({ selected }) => (
                        <div className="cursor-pointer ">
                          {selected ? (
                            <span className={`absolute inset-y-0 left-0 flex items-center`}>
                              <IoCheckmarkOutline className={`text-${theme}-primary`} size="1.4em" />
                            </span>
                          ) : null}
                          <span className={`${selected ? `text-${theme}-primary text-lg` : ""}block truncate`}>{el.name}</span>
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>
        </div>

        {/* Cards */}
        <div className="w-full flex flex-wrap justify-between mb-20">{cardsData}</div>

        {/* Modal */}
        <WeightEditModal isOpened={isModalOpened} setModalOpened={setModalOpened} modalData={modalData} />
      </div>
    </div>
  );
};

export default Weights;
