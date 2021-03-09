import React, { useContext } from "react";
import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import Modal from "react-responsive-modal";
import { ThemeContext } from "../providers/ThemeProvider";
import Button from "../templates/Button";
import Header from "../templates/Header";
import IncrementButton from "../templates/IncrementButton";
import PersonSelect from "../templates/PersonSelect";
import Text from "../templates/Text";

const Weights = () => {
  const { theme } = useContext(ThemeContext);
  const [defGroup, setDefGroup] = useState("all");
  const [isModalOpened, setModalOpened] = useState(false);
  const [modalData, setModalData] = useState({});
  const [inputMax, setInputMax] = useState(74.5);
  const [inputWork, setInputWork] = useState(66.0);

  let dummydata = [
    { label: "Deadlift", max: 54, work: 33, cat: "legs" },
    { label: "Bench", max: 72, work: 124, cat: "chest" },
    { label: "Bicep curl", max: 88, work: 16, cat: "arms" },
    { label: "sda", max: 54, work: 33, cat: "shoulders" },
    { label: "ewqe", max: 72, work: 124, cat: "back" },
    { label: "Biscep curl", max: 88, work: 16, cat: "arms" },
    { label: "Deadelift", max: 54, work: 33, cat: "legs" },
    { label: "Benwch", max: 72, work: 124, cat: "chest" },
    { label: "Biceqp curl", max: 88, work: 16, cat: "arms" },
  ];

  // Generate Cards content
  let cardsData = dummydata.map((element) => {
    if (element.cat === defGroup || defGroup === "all") {
      let categoryColor = "";

      switch (element.cat) {
        case "chest":
          categoryColor = "text-red-400 bg-red-400";
          break;
        case "arms":
          categoryColor = "text-yellow-400 bg-yellow-400";
          break;
        case "back":
          categoryColor = "text-blue-400 bg-blue-400";
          break;
        case "shoulders":
          categoryColor = "text-pink-400 bg-pink-400";
          break;
        default:
          //legs
          categoryColor = "text-green-400 bg-green-400";
      }

      return (
        <div
          className="w-1/2 p-2"
          key={element.label}
          onClick={() => {
            setModalData(element);
            setModalOpened(true);
          }}
        >
          <div className={`w-full h-full rounded-xl bg-${theme}-elev flex flex-col py-2 px-4`}>
            <p className={`text-xs ${categoryColor} font-semibold bg-opacity-20 px-2 py-1 rounded-full text-center uppercase`}>{element.cat}</p>
            <p className={`text-${theme}-tpr my-2 text-lg font-semibold text-center`}>{element.label}</p>
            <div className="w-full flex flex-row justify-center text-center">
              <div className="w-1/2 flex flex-col">
                <p className={`text-${theme}-tpr  text-2xl font-semibold`}>{element.max}</p>
                <p className={`text-${theme}-tsec`}>work</p>
              </div>
              <div className="w-1/2 flex flex-col">
                <p className={`text-${theme}-tpr text-2xl font-semibold`}>{element.work}</p>
                <p className={`text-${theme}-tsec`}>max</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else return "";
  });

  //Onsubmit function
  function onSubmit() {
    setModalOpened(false);
  }

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
          className={`w-2/3 my-2 border bg-black bg-opacity-10 border-none text-${theme}-tsec text-base rounded-xl py-2`}
        >
          <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="all">
            Všechny partie
          </option>
          <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="legs">
            Nohy
          </option>
          <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="chest">
            Prsa
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
      <Modal
        open={isModalOpened}
        onClose={() => {
          setModalOpened(false);
        }}
        classNames={{
          modal: theme === "dark" ? "customEditModalDark" : "customEditModal",
        }}
        showCloseIcon={false}
        animationDuration={350}
      >
        <div className="p-5">
          {/* <div className="flex justify-end">
            <IoCloseOutline size="2em" className={`text-${theme}-primary`} onClick={() => setModalOpened(false)} />
          </div> */}
          <div className="flex flex-col w-full justify-center text-center">
            <p className={`text-2xl font-semibold text-${theme}-tpr`}>{modalData.label}</p>

            {/* Max */}
            <p className={`text-${theme}-tsec my-5`}>Maximální váha</p>
            <div className="w-full flex flex-row items-center justify-center">
              <div className="w-1/5">
                <IncrementButton clickFunction={() => setInputMax((parseFloat(inputMax) - 0.5).toFixed(1))}>-</IncrementButton>
              </div>
              <div className="w-3/5">
                <input
                  min="0"
                  max="500"
                  type="number"
                  className={`focus:outline-none text-center w-full text-${theme}-tpr bg-black bg-opacity-0 font-semibold text-4xl  md:text-basecursor-default flex items-center outline-none`}
                  value={inputMax}
                  step="0.5"
                  onChange={(e) => setInputMax(parseFloat(e.target.value).toFixed(1))}
                ></input>
              </div>
              <div className="w-1/5">
                <IncrementButton clickFunction={() => setInputMax((parseFloat(inputMax) + 0.5).toFixed(1))}>+</IncrementButton>
              </div>
            </div>

            {/* Work */}
            <p className={`text-${theme}-tsec my-5`}>Pracovní váha</p>
            <div className="w-full flex flex-row items-center justify-center">
              <div className="w-1/5">
                <IncrementButton clickFunction={() => setInputWork((parseFloat(inputWork) - 0.5).toFixed(1))}>-</IncrementButton>
              </div>
              <div className="w-3/5">
                <input
                  min="0"
                  max="500"
                  type="number"
                  className={`focus:outline-none text-center w-full text-${theme}-tpr bg-black bg-opacity-0 font-semibold text-4xl  md:text-basecursor-default flex items-center outline-none`}
                  value={inputWork}
                  step="0.5"
                  onChange={(e) => setInputWork(parseFloat(e.target.value).toFixed(1))}
                ></input>
              </div>
              <div className="w-1/5">
                <IncrementButton clickFunction={() => setInputWork((parseFloat(inputWork) + 0.5).toFixed(1))}>+</IncrementButton>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-14 w-full">
              <Button className="m-5" btnStyle={"empty"} clickFunction={() => setModalOpened(false)}>
                Zrušit
              </Button>
              <Button btnStyle="full" clickFunction={() => onSubmit()}>
                Potvrdit
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Weights;
