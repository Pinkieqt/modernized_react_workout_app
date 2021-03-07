import React, { useContext, useState } from "react";
import { DefUserContext } from "../providers/DefaultUserProvider";
import { ThemeContext } from "../providers/ThemeProvider";
import Button from "../templates/Button";
import IncrementButton from "../templates/IncrementButton";
import Text from "../templates/Text";

const AddWeightComponent = ({ closeHandler }) => {
  const { theme } = useContext(ThemeContext);
  const { defUser, setDefUser } = useContext(DefUserContext);
  const [inputWeight, setInputWeight] = useState(76.4);

  //Function to call on submit
  function onSubmit() {
    closeHandler();
  }

  return (
    <div className="flex flex-col items-center text-center">
      <Text>Vyber se, zadej svou váhu a poté ulož změny.</Text>
      <select
        value={defUser}
        onChange={(e) => setDefUser(e.target.value)}
        className={`w-2/3 border bg-black bg-opacity-10 border-none text-${theme}-tsec text-base rounded-xl py-2`}
      >
        <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="dudu">
          Dudu
        </option>
        <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="luke">
          Luke
        </option>
        <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="tom">
          Tom
        </option>
        <option className={`py-1 text-${theme}-tsec bg-${theme}-elev`} value="dejvo">
          Dejvo
        </option>
      </select>

      <div className="w-full flex flex-row items-center justify-center mt-14">
        <div className="w-1/5">
          <IncrementButton clickFunction={() => setInputWeight((parseFloat(inputWeight) - 0.1).toFixed(1))}>-</IncrementButton>
        </div>
        <div className="w-3/5">
          <input
            type="number"
            className={`focus:outline-none text-center w-full text-${theme}-tpr bg-black bg-opacity-0 font-semibold text-5xl  md:text-basecursor-default flex items-center outline-none`}
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
