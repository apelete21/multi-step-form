import utilStyles from "../../styles/utils.module.css";
import personalStyles from "../../styles/PersonalInfo.module.css";
import HourStyles from "../../styles/Hour.module.css";
import { useState } from "react";
import RadioBox from "./hoursComponents/RadioBox";
import CheckBox from "./hoursComponents/Checkbox";
import Decision from "./hoursComponents/Decision";

const weekDays = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const hoursAM = ["05h30", "06h30", "07h30", "08h00", "09h00", "10h00"];
const hoursPM = ["16h00", "17h00", "18h00", "19h00", "20h00", "21h00"];

function Hours({ hoursInfo, sethoursInfo, validData }) {
  const [homeDeparture, setcheckValueAM] = useState("");
  const [WorkDeparture, setcheckValuePM] = useState("");

  // handle home departure time
  function handleHD(e) {
    setcheckValueAM(e.target.value);
    sethoursInfo({
      ...hoursInfo,
      homeDeparture: e.target.value,
    });
    console.log(e.target.value);
  }
  // handle work departure time
  function handleWD(e) {
    setcheckValuePM(e.target.value);
    sethoursInfo({
      ...hoursInfo,
      WorkDeparture: e.target.value,
    });
    console.log(e.target.value);
  }

  return (
    <section className="hourSection">
      <h1 className={`${utilStyles.title} ${utilStyles.colorText}`}>
        Horaires
      </h1>
      <div className={HourStyles.hourBody}>
        <label htmlFor="this" className={utilStyles.colorText}>
          <div className={personalStyles.labelContainer}>
            <span>Choisissez vos jours de convoiturage Domicile - Travail</span>
            {!validData.hasValidDays && (
              <span className={utilStyles.error}>Ce champ est obligatoire</span>
            )}
          </div>
          <div className={HourStyles.boxContainer}>
            {weekDays.map((item, i) => {
              return (
                <CheckBox
                  key={i}
                  value={item}
                  sethoursInfo={sethoursInfo}
                  hoursInfo={hoursInfo}
                />
              );
            })}
          </div>
        </label>
        <label htmlFor="this" className={utilStyles.colorText}>
          <div className={personalStyles.labelContainer}>
            <span>Choisissez l'heure de départ de votre Domicile </span>
            {!validData.hasValidHome && (
              <span className={utilStyles.error}>Ce champ est obligatoire</span>
            )}
          </div>
          <div className={HourStyles.boxContainer}>
            {hoursAM.map((item, i) => {
              return (
                <RadioBox
                  key={i}
                  value={item}
                  handleChoose={handleHD}
                  checkValue={homeDeparture}
                />
              );
            })}
          </div>
        </label>
        <label htmlFor="this" className={utilStyles.colorText}>
          <div className={personalStyles.labelContainer}>
            <span>Choisissez l'heure de départ de votre lieu de travail </span>
            {!validData.hasValidWork && (
              <span className={utilStyles.error}>Ce champ est obligatoire</span>
            )}
          </div>
          <div className={HourStyles.boxContainer}>
            {hoursPM.map((item, i) => {
              return (
                <RadioBox
                  key={i}
                  value={item}
                  handleChoose={handleWD}
                  checkValue={WorkDeparture}
                />
              );
            })}
          </div>
        </label>
        <label htmlFor="this" className={utilStyles.colorText}>
          <div className={personalStyles.labelContainer}>
            <span>
              Souhaitez-vous faire du convoiturage Domicile - Travail ?{" "}
              {!validData.hasValidDecision && (
                <span className={utilStyles.error}>
                  Ce champ est obligatoire
                </span>
              )}
            </span>
          </div>
          <div className={HourStyles.hourboxContainer}>
            <Decision data={hoursInfo} setData={sethoursInfo} />
          </div>
        </label>
      </div>
    </section>
  );
}

export default Hours;
