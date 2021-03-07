import React, { useState } from "react";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { utils } from "@hassanmojab/react-modern-calendar-datepicker";
import Text from "../templates/Text";
import "../App.css";
import Members from "../helpfiles/Members";
import { IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5";
import Button from "../templates/Button";

const AddArrivalComponent = ({ closeHandler }) => {
  const [selectedDay, setSelectedDay] = useState(utils().getToday());
  const [selectedItems, setItems] = useState({ dudu: false, luke: false, tom: false, dejvo: false });

  // Checkbox items - members
  let checkedCSS =
    "w-2/5 bg-green-400 bg-opacity-10 mx-2 my-2 text-lg p-3 rounded-xl flex justify-between items-center text-green-400 border border-green-400 border-opacity-20";
  let uncheckedCSS =
    "w-2/5 bg-red-400 bg-opacity-10 mx-2 my-2 text-lg p-3 rounded-xl flex justify-between items-center text-red-400 border border-red-400 border-opacity-20";
  let checkboxItems = Members.map((item, index) => (
    <button className={selectedItems[item.key] ? checkedCSS : uncheckedCSS} onClick={() => onCheckChange(item.key)} key={item.key}>
      <p>{item.label}</p>
      {selectedItems[item.key] ? <IoCheckmarkOutline className="text-green-400" /> : <IoCloseOutline className="text-red-400" />}
    </button>
  ));

  //On member button click handler
  function onCheckChange(key) {
    let copyItems = { ...selectedItems }; //create a new copy
    copyItems[key] = !copyItems[key]; //change the value of bar
    setItems(copyItems);
  }

  //On submit function
  function onSubmit() {
    closeHandler();
  }

  return (
    <div className="flex flex-col items-center text-center">
      <Text className="m-3">Vyber uživatele a potvrď zapsání. Lze vybrat datum i pro pozdější zápisy.</Text>
      <div className="mb-3">
        <DatePicker
          calendarClassName="customCalendarDark"
          inputClassName="customCalendarInputDark"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e)}
          inputPlaceholder="Select a day"
          shouldHighlightWeekends
          colorPrimary="#0a84ff"
        />
      </div>
      <div className="flex flex-wrap w-full justify-center">
        {checkboxItems}

        {/* Buttons */}
        <div className="mt-10 w-full">
          <Button className="m-5" btnStyle={"empty"} clickFunction={() => closeHandler()}>
            Zrušit
          </Button>
          <Button btnStyle="full" clickFunction={() => onSubmit()}>
            Potvrdit
          </Button>
        </div>
      </div>
      {/* <Text>Klikni na členy, kteří dnes přišli do posilovny a ulož změny. O provedených změnách budeš informován.</Text> */}
    </div>
  );
};

export default AddArrivalComponent;
