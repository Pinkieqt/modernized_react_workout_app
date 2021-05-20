import React, { useContext, useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { UsersDataContext } from "../App";
import { DefUserContext } from "../providers/DefaultUserProvider";
import { ThemeContext } from "../providers/ThemeProvider";
import Button from "../templates/Button";
import IncrementButton from "../templates/IncrementButton";
import Text from "../templates/Text";
import { fireStamp, firestore } from "../utils/Firebase";

const AddWeightComponent = ({ closeHandler }) => {
  const usersData = useContext(UsersDataContext);
  const { defUser } = useContext(DefUserContext);
  const { addToast } = useToasts();
  const { theme } = useContext(ThemeContext);
  const [inputWeight, setInputWeight] = useState(70.0);

  //Get previous weight of selected user
  useEffect(() => {
    const memberData = usersData.filter((item) => {
      return item.id === defUser;
    });

    //Get latest weight record
    let tmpWeight = memberData[0].weightData[memberData[0].weightData.length - 1];

    //Set it as state
    if (tmpWeight !== undefined) setInputWeight(tmpWeight.weight);
    else setInputWeight(70);
  }, [defUser, usersData]);

  //Function to call on submit
  function onSubmit() {
    let date = new Date();
    date.setHours(12, 0, 0, 0);

    const memberData = usersData.filter((member) => {
      return member.id === defUser;
    });
    let isInside = false;
    let tmpWeight = memberData[0].weightData;

    //check if already inside -> then only update
    tmpWeight.forEach((element) => {
      if (element.date.toDate().getTime() === fireStamp.fromDate(date).toDate().getTime()) {
        element.weight = inputWeight * 1;
        isInside = true;
      }
    });

    //if not then add
    if (!isInside) {
      tmpWeight.push({
        date: fireStamp.fromDate(date),
        weight: inputWeight * 1,
      });
    }

    //Update record in database
    firestore
      .collection("users")
      .doc(defUser)
      .update({ weightData: tmpWeight })
      .catch(function (error) {
        addToast("Vyskytla se chyba, zkus zopakovat později.", { appearance: "error" });
      });

    //Dismiss modal
    closeHandler();

    //Notification
    addToast("Váha zapsána pro uživatele " + memberData[0].name + ".", { appearance: "success" });
  }

  return (
    <div className="flex flex-col items-center text-center">
      <Text>Zadej svou váhu a poté ulož změny.</Text>
      {/* <PersonSelect /> */}

      <div className="w-full flex flex-row items-center justify-center mt-14">
        <div className="w-1/5">
          <IncrementButton clickFunction={() => setInputWeight((parseFloat(inputWeight) - 0.1).toFixed(1))}>-</IncrementButton>
        </div>
        <div className="w-3/5">
          <input
            min="40"
            max="500"
            type="number"
            className={`border-none focus:outline-none text-center w-full text-${theme}-tpr bg-black bg-opacity-0 font-semibold text-5xl  md:text-basecursor-default flex items-center outline-none`}
            value={inputWeight}
            step="0.1"
            onChange={(e) => setInputWeight(parseFloat(e.target.value).toFixed(1))}
          ></input>
        </div>
        <div className="w-1/5">
          <IncrementButton clickFunction={() => setInputWeight((parseFloat(inputWeight) + 0.1).toFixed(1))}>+</IncrementButton>
        </div>
      </div>
      {/* Buttons */}
      <div className="mt-14 w-full">
        <Button className="m-5" btnStyle={"empty"} clickFunction={() => closeHandler()}>
          Zrušit
        </Button>
        <Button btnStyle="full" clickFunction={() => onSubmit()}>
          Potvrdit
        </Button>
      </div>
    </div>
  );
};

export default AddWeightComponent;
