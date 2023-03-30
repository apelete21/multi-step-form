import React from "react";
import utilStyles from "../../styles/utils.module.css";
import personalStyles from "../../styles/PersonalInfo.module.css";

const Passengers = ({ passengersInfo, setPassengersInfo, validPassengers }) => {

  function handleTripPriceChange(e) {
    setPassengersInfo({
      ...passengersInfo,
      tripPrice: e.target.value,
    });
  }

  function getError(validator) {
    if (!validator || validator === "")
      return (
        <span className={utilStyles.error}>
          {validator === undefined
            ? "Veuillez remplir ce champ"
            : "Format incorrect"}
        </span>
      );
  }

  return (
    <>
      <h1 className={`${utilStyles.title} ${utilStyles.colorText}`}>
        Passagers
      </h1>
      <fieldset className={utilStyles.noBorder}>
        <legend className={utilStyles.description}>
          Veuillez insèrer les informations correspondantes.
        </legend>
        <label
          htmlFor="fullname"
          className={`${personalStyles.label} ${utilStyles.colorText}`}
        >
          {" "}
          <div className={personalStyles.labelContainer}>
            <span>
              Quel est le tarif que vous avez l'habitude de payer pour vous
              rendre au travail ?
            </span>
            {getError(validPassengers.hasValidTripPrice)}
          </div>
          <input
            className={`
              ${personalStyles.inputOne}
              ${
                !validPassengers.hasValidTripPrice && utilStyles.containerError
              }
            `}
            type="number"
            maxLength={32}
            value={passengersInfo.tripPrice}
            onChange={handleTripPriceChange}
          />
        </label>
      </fieldset>
    </>
  );
};

export default Passengers;
