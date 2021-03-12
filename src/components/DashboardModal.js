import React, { useContext, useState } from "react";
import Modal from "react-responsive-modal";
import { ThemeContext } from "../providers/ThemeProvider";
import Button from "../templates/Button";
import { IoCloseOutline, IoSkullOutline } from "react-icons/io5";

const DashboardModal = ({ isOpened, setModalOpened, modalData }) => {
  const { theme } = useContext(ThemeContext);
  const [showTo, setShowTo] = useState(15);

  let dummyData = [
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
    { name: "Dudu", date: "23.04.2012" },
  ];

  //Function to delete item
  function deleteItem(index) {
    console.log(index);
  }

  //Function to generate/render data in modal
  function generateData() {
    return dummyData.slice(0, showTo).map((element, index) => {
      return (
        <div
          key={index}
          className={`w-full flex justify-around text-${theme}-tsec py-1 border-b border-${theme}-tter`}
          onClick={() => deleteItem(index)}
        >
          <div className="flex items-center">
            <IoSkullOutline size="1.3em" />
          </div>
          <div className={`w-1/3 flex flex-col justify-center`}>
            <p>{element.name}</p>
            <p className={`text-${theme}-primary text-sm`}>{element.date}</p>
          </div>
          <div className={`w-1/3 flex justify-end items-center text-${theme}-tter`}>
            <IoCloseOutline size="1.3em" />
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
