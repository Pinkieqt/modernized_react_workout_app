import React, { useContext } from "react";
import { useState } from "react";
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
    { label: "Deadlift", max: 54, work: 33, cat: "nohy" },
    { label: "Bench", max: 72, work: 124, cat: "hrudník" },
    { label: "Bicep curl", max: 88, work: 16, cat: "ruce" },
    { label: "sda", max: 54, work: 33, cat: "ramena" },
    { label: "ewqe", max: 72, work: 124, cat: "záda" },
    { label: "Biscep curl", max: 88, work: 16, cat: "ruce" },
    { label: "Deadelift", max: 54, work: 33, cat: "nohy" },
    { label: "Benwch", max: 72, work: 124, cat: "hrudník" },
    { label: "Biceqp curl", max: 88, work: 16, cat: "ruce" },
  ];

  // Generate Cards content
  let cardsData = dummydata.map((element) => {
    if (element.cat === defGroup || defGroup === "all") {
      let categoryColor = "";

      switch (element.cat) {
        case "hrudník":
          categoryColor = "text-magma-1 bg-magma-1";
          break;
        case "ruce":
          categoryColor = "text-magma-2 bg-magma-2";
          break;
        case "záda":
          categoryColor = "text-magma-3 bg-magma-3";
          break;
        case "ramena":
          categoryColor = "text-magma-4 bg-magma-4";
          break;
        default:
          //legs
          categoryColor = "text-magma-5 bg-magma-5";
      }

      return (
        <div className="w-1/2 p-2" key={element.label}>
          <div
            className={`w-full h-full rounded-xl bg-${theme}-elev flex flex-col py-2 px-4`}
            onClick={() => {
              setModalData(element);
              setModalOpened(true);
            }}
          >
            <p className={`text-xs ${categoryColor} font-semibold bg-opacity-20 px-2 py-1 rounded-full text-center uppercase`}>{element.cat}</p>
            <p className={`text-${theme}-tpr my-2 text-lg font-semibold text-center`}>{element.label}</p>
            <div className="w-full flex flex-row justify-center text-center">
              <div className="w-1/2 flex flex-col">
                <p className={`text-${theme}-tsec  text-2xl`}>{element.max}</p>
                <p className={`text-${theme}-tsec`}>work</p>
              </div>
              <div className="w-1/2 flex flex-col">
                <p className={`text-${theme}-tsec text-2xl`}>{element.work}</p>
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
          className={`w-2/3 my-2 border bg-black bg-opacity-10 border-none text-${theme}-tsec text-base rounded-xl py-2  focus:outline-none focus:ring focus:ring-${theme}-primary`}
        >
          <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="all">
            Všechny partie
          </option>
          <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="nohy">
            Nohy
          </option>
          <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="hrudník">
            Prsa
          </option>
          <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="záda">
            Záda
          </option>
          <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="ramena">
            Ramena
          </option>
          <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="ruce">
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
                  className={`border-none  focus:outline-none text-center w-full text-${theme}-tpr bg-black bg-opacity-0 font-semibold text-4xl  md:text-basecursor-default flex items-center outline-none`}
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
                  className={`border-none  focus:outline-none text-center w-full text-${theme}-tpr bg-black bg-opacity-0 font-semibold text-4xl  md:text-basecursor-default flex items-center outline-none`}
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
