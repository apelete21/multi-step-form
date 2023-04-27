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

const hoursAM = [
  "05H00",
  "05H30",
  "06H00",
  "06H30",
  "07H00",
  "07H30",
  "08H00",
  "08H30",
  "09H00",
  "09H30",
  "10H00",
];
const hoursPM = [
  "16H00",
  "16H30",
  "17H00",
  "17H30",
  "18H00",
  "18H30",
  "19H00",
  "19H30",
  "20H00",
  "20H30",
  "21H00",
];

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
  }
  // handle work departure time
  function handleWD(e) {
    setcheckValuePM(e.target.value);
    sethoursInfo({
      ...hoursInfo,
      WorkDeparture: e.target.value,
    });
  }

  return (
    <section className="hourSection">
      <h1 className={`${utilStyles.title} ${utilStyles.colorText}`}>
        Horaires
      </h1>
      <div className={HourStyles.hourBody}>
        <label
          htmlFor="this"
          className={`${personalStyles.label} ${utilStyles.colorText}`}
        >
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
        <label
          htmlFor="this"
          className={`${personalStyles.label} ${utilStyles.colorText}`}
        >
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
        <label
          htmlFor="this"
          className={`${personalStyles.label} ${utilStyles.colorText}`}
        >
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
        <label
          htmlFor="this"
          className={`${personalStyles.label} ${utilStyles.colorText}`}
        >
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
