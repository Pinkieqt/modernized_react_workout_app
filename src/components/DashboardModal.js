import React, { useContext, useState } from "react";
import Modal from "react-responsive-modal";
import { ThemeContext } from "../providers/ThemeProvider";
import Button from "../templates/Button";
import { IoCloseOutline, IoSkullOutline } from "react-icons/io5";
import { fireStamp, firestore } from "../utils/Firebase";
import { UsersDataContext } from "../App";
import { useToasts } from "react-toast-notifications";

const DashboardModal = ({ isOpened, setModalOpened, modalData }) => {
  const { theme } = useContext(ThemeContext);
  const usersData = useContext(UsersDataContext);
  const { addToast } = useToasts();

  const [showTo, setShowTo] = useState(15);

  //Function to delete item
  function deleteItem(element) {
    let tmpArrivals = [];
    usersData.forEach((user) => {
      if (user.name === element.member) {
        tmpArrivals = user.arrivals;
        tmpArrivals.forEach((arrival) => {
          if (arrival.toDate().getTime() === fireStamp.fromDate(element.date).toDate().getTime()) {
            //Delete arrival from array
            if (
              window.confirm(
                "Opravdu vymazat záznam? (" +
                  arrival.toDate().getDate() +
                  "." +
                  (arrival.toDate().getMonth() + 1) +
                  "." +
                  arrival.toDate().getFullYear() +
                  ", " +
                  element.member +
                  ")"
              )
            ) {
              tmpArrivals.splice(tmpArrivals.indexOf(arrival), 1);
              //Update record in database
              firestore
                .collection("users")
                .doc(user.id)
                .update({ arrivals: tmpArrivals })
                .then(() => {
                  setModalOpened(false);
                  addToast("Záznam byl vymazán", { appearance: "success" });
                })
                .catch(() => {
                  setModalOpened(false);
                  addToast("Vyskytla se chyba, zkuz zopakovat za chvíli", { appearance: "error" });
                });
            }
          }
        });
      }
    });
  }

  //Function to generate/render data in modal
  function generateData() {
    return modalData.slice(0, showTo).map((element, index) => {
      let userColor = "text-magma-1";
      let tmpDate = element.date.getDate() + "." + (element.date.getMonth() + 1) + ". " + element.date.getFullYear();

      // Color of icon
      switch (element.member) {
        case "Dudu":
          userColor = "text-magma-2";
          break;
        case "Tom":
          userColor = "text-magma-3";
          break;
        case "Dejvo":
          userColor = "text-magma-4";
          break;
        case "Luke":
          userColor = "text-magma-5";
          break;
        default:
          userColor = "text-magma-1";
      }

      return (
        <div key={index} className={`w-full flex justify-around text-${theme}-tpr py-1`}>
          <div className={`flex items-center ${userColor}`}>
            <IoSkullOutline size="1.3em" />
          </div>
          <div className={`w-1/3 flex flex-col justify-center`}>
            <p>{element.member}</p>
            <p className={`text-${theme}-tsec text-sm`}>{tmpDate}</p>
          </div>
          <div className={`w-1/3 flex justify-end items-center text-${theme}-tter`}>
            <IoCloseOutline size="1.3em" onClick={() => deleteItem(element)} />
          </div>
        </div>
      );
    });
  }

  return (
    <Modal
      open={isOpened}
      onClose={() => {
        setModalOpened(false);
      }}
      classNames={{
        modal: theme === "dark" ? "customModalDark" : "customModal",
      }}
      showCloseIcon={false}
      animationDuration={350}
    >
      {/* Container */}
      <div className="w-full flex-col">
        {/* Button */}
        <div className="w-full sticky top-0 left-0 py-3 px-5">
          <Button btnStyle="expand-full" clickFunction={() => setModalOpened(false)}>
            Zavřít
          </Button>
        </div>

        {/* Content */}
        <div className="">
          {/* Data */}
          {generateData()}

          {/* Button to show more */}
          <Button btnStyle="expand-empty" clickFunction={() => setShowTo(showTo + 30)}>
            Načíst další záznamy
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DashboardModal;
