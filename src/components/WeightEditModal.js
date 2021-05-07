import React, { useContext, useEffect, useState } from "react";
import Modal from "react-responsive-modal";
import { ThemeContext } from "../providers/ThemeProvider";
import Button from "../templates/Button";
import { UsersDataContext } from "../App";
import { useToasts } from "react-toast-notifications";
import IncrementButton from "../templates/IncrementButton";
import { DefUserContext } from "../providers/DefaultUserProvider";
import { firestore } from "../utils/Firebase";

const WeightEditModal = ({ isOpened, setModalOpened, modalData }) => {
  const { theme } = useContext(ThemeContext);
  const usersData = useContext(UsersDataContext);
  const { defUser } = useContext(DefUserContext);
  const { addToast } = useToasts();
  const [inputMax, setInputMax] = useState(0);
  const [inputWork, setInputWork] = useState(0);
  const [label, setLabel] = useState("-");
  const [exKey, setExKey] = useState("-");

  useEffect(() => {
    setInputMax(modalData.max);
    setInputWork(modalData.work);
    setLabel(modalData.label);
    setExKey(modalData.key);
  }, [modalData]);

  //onSubmit function
  function onSubmit() {
    //get initial data of exerscise for selected member
    if (usersData !== undefined) {
      const memberData = usersData.filter((member) => {
        return member.id === defUser;
      });

      let isExerciseInside = false;

      if (memberData.length > 0) {
        let tmpExData = memberData[0].exercisesData;
        tmpExData.forEach((element) => {
          if (element.key === exKey) {
            isExerciseInside = true;
            element.work = parseFloat(inputWork);
            element.max = parseFloat(inputMax);
          }
        });

        if (!isExerciseInside) {
          tmpExData.push({ key: exKey, max: parseFloat(inputMax), work: parseFloat(inputWork) });
        }

        //Update record in database
        firestore
          .collection("users")
          .doc(defUser)
          .update({ exercisesData: tmpExData })
          .then(function () {
            addToast(label + " upraven", { appearance: "success" });
          })
          .catch(function (error) {
            addToast("Vyskytla se chyba, zkuz zopakovat za chvíli", { appearance: "error" });
          });

        //Close dialog
        setModalOpened(false);
      }
    }
  }

  return (
    <Modal
      open={isOpened}
      onClose={() => {
        setModalOpened(false);
      }}
      classNames={{
        modal: "customEditModal" + theme,
      }}
      showCloseIcon={false}
      animationDuration={350}
    >
      <div className="p-5">
        {/* <div className="flex justify-end">
            <IoCloseOutline size="2em" className={`text-${theme}-primary`} onClick={() => setModalOpened(false)} />
          </div> */}
        <div className="flex flex-col w-full justify-center text-center">
          <p className={`text-2xl font-semibold text-${theme}-tpr`}>{label}</p>

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
  );
};

export default WeightEditModal;
