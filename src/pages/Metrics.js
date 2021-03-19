import React, { useContext, useEffect, useState } from "react";
import CardsComponent from "../components/CardsComponent";
import { ThemeContext } from "../providers/ThemeProvider";
import Header from "../templates/Header";
import PersonSelect from "../templates/PersonSelect";
import Text from "../templates/Text";
import IncrementButton from "../templates/IncrementButton";
import { IoCloseOutline } from "react-icons/io5";
import Card from "../templates/Card";
import Subheader from "../templates/Subheader";
import { UsersDataContext } from "../App";
import { DefUserContext } from "../providers/DefaultUserProvider";
import { useToasts } from "react-toast-notifications";
import LoadingComponent from "../components/LoadingComponent";
import { fireStamp, firestore } from "../utils/Firebase";

const Metrics = () => {
  const usersData = useContext(UsersDataContext);
  const { defUser } = useContext(DefUserContext);
  const { addToast } = useToasts();
  const { theme } = useContext(ThemeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [memberCardData, setMemberCardData] = useState(null);
  const [memberWeightData, setMemberWeightData] = useState(null);

  //Generate new content everytime when props change
  useEffect(() => {
    const memberData = usersData.filter((member) => {
      return member.id === defUser;
    });

    //Members max and work weights
    if (memberData) {
      if (memberData[0].weightData.length > 0) {
        let tmpMax = 0;
        let tmpMin = 1000; //highest
        let tmpAvg = 0;
        memberData[0].weightData.forEach((element) => {
          if (tmpMax < element.weight) tmpMax = element.weight;
          if (tmpMin > element.weight) tmpMin = element.weight;
          tmpAvg = tmpAvg + element.weight;
        });
        tmpAvg = tmpAvg / memberData[0].weightData.length;

        setMemberCardData({
          max: tmpMax,
          min: tmpMin,
          avg: tmpAvg.toFixed(1),
          len: memberData[0].weightData.length,
        });
        setMemberWeightData(memberData[0].weightData);
      } else {
        setMemberCardData({
          max: "-",
          min: "-",
          avg: "-",
          idk: "-",
        });
        setMemberWeightData([]);
      }
    }
  }, [usersData, defUser]);

  //Function to delete item
  function deleteItem(element) {
    console.log(element);
    usersData.forEach((user) => {
      if (user.id === defUser) {
        let tmpWeightData = user.weightData;
        tmpWeightData.forEach((weightInput) => {
          if (weightInput.date === element.date) {
            //Delete arrival from array
            if (
              window.confirm(
                "Opravdu vymazat záznam? (" +
                  weightInput.date.toDate().getDate() +
                  "." +
                  (weightInput.date.toDate().getMonth() + 1) +
                  "." +
                  weightInput.date.toDate().getFullYear() +
                  ", " +
                  weightInput.weight +
                  " kg)"
              )
            ) {
              tmpWeightData.splice(tmpWeightData.indexOf(weightInput), 1);
              //Update record in database
              firestore
                .collection("users")
                .doc(user.id)
                .update({ weightData: tmpWeightData })
                .then(() => {
                  addToast("Záznam byl vymazán", { appearance: "success" });
                })
                .catch(() => {
                  addToast("Vyskytla se chyba, zkuz zopakovat za chvíli", { appearance: "error" });
                });
            }
          }
        });
      }
    });
  }

  //Function to get data
  function getRecentData() {
    return memberWeightData
      .slice()
      .reverse()
      .slice(currentPage * 10 - 10, currentPage * 10)
      .map((element, index) => {
        let tmpDate = element.date.toDate().getDate() + "." + (element.date.toDate().getMonth() + 1) + ".";
        return (
          <div className={`w-full flex justify-around text-${theme}-tsec py-1 my-1`} key={index}>
            <div className={`w-1/3 flex flex-col justify-center`}>
              <p className={`text-${theme}-primary text-lg`}>
                {element.weight} <span className={`text-${theme}-tsec text-sm`}>kg</span>
              </p>
              <p className="text-sm">{tmpDate}</p>
            </div>
            <div className={`w-1/3 flex justify-end items-center text-${theme}-tter`}>
              <IoCloseOutline size="1.3em" onClick={() => deleteItem(element)} />
            </div>
          </div>
        );
      });
  }

  return (
    <>
      {memberWeightData === null ? (
        <LoadingComponent />
      ) : (
        <div className={`p-4 min-h-screen bg-${theme}-bg`}>
          <Header>Metriky</Header>
          <Text>Po vybrání uživatele se zobrazí váhové statistiky daného uživatele.</Text>

          <div className="w-full flex flex-col justify-center items-center">
            <PersonSelect />

            {/* Cards */}
            <CardsComponent cardsData={memberCardData} location="weight" />

            {/* Graph */}
            <div className="w-full h-52 bg-gray-800 rounded-xl mb-10 "></div>

            {/* Recent adding */}
            <Card>
              <Subheader>Tvá historie zápisů</Subheader>
              <div className={`w-full flex items-center justify-center text-center my-4 text-${theme}-tsec`}>
                <div className="w-1/5">
                  <IncrementButton clickFunction={() => setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)}>-</IncrementButton>
                </div>
                <div className="w-3/5 text-xl">
                  <p>{currentPage * 10 - 10 + " - " + currentPage * 10}</p>
                </div>
                <div className="w-1/5">
                  <IncrementButton clickFunction={() => setCurrentPage(currentPage + 1)}>+</IncrementButton>
                </div>
              </div>

              {/* Recent Data */}
              {getRecentData()}
            </Card>
          </div>
          <div className="mb-20"></div>
        </div>
      )}
    </>
  );
};

export default Metrics;
