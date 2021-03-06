import React, { useContext, useState } from "react";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { utils } from "@hassanmojab/react-modern-calendar-datepicker";
import Text from "../templates/Text";
import "../App.css";
import Members from "../helpfiles/Members";
import { IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5";
import Button from "../templates/Button";
import { UsersDataContext } from "../App";
import { fireStamp, firestore } from "../utils/Firebase";
import { useToasts } from "react-toast-notifications";

const AddArrivalComponent = ({ closeHandler }) => {
  const usersData = useContext(UsersDataContext);
  const { addToast } = useToasts();
  const [selectedDay, setSelectedDay] = useState(utils().getToday());
  const [selectedItems, setItems] = useState({ dudu: false, luke: false, tom: false, dejvo: false });

  // Checkbox items - members
  let checkedCSS =
    "w-2/5 bg-green-400 bg-opacity-10 mx-2 my-2 text-lg p-3 rounded-xl flex justify-between items-center text-green-400 border border-green-400 border-opacity-20";
  let uncheckedCSS =
    "w-2/5 bg-red-400 bg-opacity-10 mx-2 my-2 text-lg p-3 rounded-xl flex justify-between items-center text-red-400 border border-red-400 border-opacity-20";
  let checkboxItems = Members.map((item) => (
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
    let selectedDate = new Date(selectedDay.year, selectedDay.month - 1, selectedDay.day, 12, 0, 0, 0);

    let addedMembers = [];
    let notAddedMembers = [];

    for (let element in selectedItems) {
      let arrived = selectedItems[element];
      let isInside = false;
      //Member arrived
      if (arrived) {
        const memberData = usersData.filter((member) => {
          return member.id === element;
        });

        //check if member is already registered
        memberData[0].arrivals.forEach((arrival) => {
          if (arrival.toDate().getTime() === fireStamp.fromDate(selectedDate).toDate().getTime()) {
            isInside = true;
          }
        });

        if (!isInside) {
          let tmpArrivals = memberData[0].arrivals;
          tmpArrivals.push(fireStamp.fromDate(selectedDate));
          firestore.collection("users").doc(element).update({ arrivals: tmpArrivals });
          addedMembers.push(memberData[0].name);
        } else {
          notAddedMembers.push(memberData[0].name);
        }
      }
    }

    //Dismiss modal
    closeHandler();

    // //Notification
    if (addedMembers.length > 1) addToast("U??ivatel?? " + addedMembers.toString() + " p??ips??ni.", { appearance: "success" });
    else if (addedMembers.length === 1) addToast("U??ivatel " + addedMembers.toString() + " p??ips??n.", { appearance: "success" });
    if (notAddedMembers.length > 1) addToast("U??ivatel?? " + notAddedMembers.toString() + " jsou ji?? zaps??ni.", { appearance: "error" });
    if (notAddedMembers.length === 1) addToast("U??ivatel " + notAddedMembers.toString() + " je ji?? zaps??n.", { appearance: "error" });
  }

  return (
    <div className="flex flex-col items-center text-center">
      <Text className="m-3">Vyber u??ivatele a potvr?? zaps??n??. Lze vybrat datum i pro pozd??j???? z??pisy.</Text>
      <div className="mb-3">
        <DatePicker
          calendarPopperPosition="bottom"
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
            Zru??it
          </Button>
          <Button btnStyle="full" clickFunction={() => onSubmit()}>
            Potvrdit
          </Button>
        </div>
      </div>
      {/* <Text>Klikni na ??leny, kte???? dnes p??i??li do posilovny a ulo?? zm??ny. O proveden??ch zm??n??ch bude?? informov??n.</Text> */}
    </div>
  );
};

export default AddArrivalComponent;
