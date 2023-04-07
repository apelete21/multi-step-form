import React from "react";
import utilStyles from "../../styles/utils.module.css";
import personalStyles from "../../styles/PersonalInfo.module.css";

const Drivers = ({ driversInfo, setDriversInfo, validDrivers }) => {
  function handleFreePlaces(e) {
    setDriversInfo({
      ...driversInfo,
      freePlaces: e.target.value,
    });
  }

  function handlePricePerPlace(e) {
    setDriversInfo({
      ...driversInfo,
      pricePerPlace: e.target.value,
    });
  }

  function handleCarBrand(e) {
    setDriversInfo({
      ...driversInfo,
      carBrand: e.target.value,
    });
  }

  function handleFuel(e) {
    setDriversInfo({
      ...driversInfo,
      fuel: e.target.value,
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
        Conducteurs
      </h1>
      <fieldset className={utilStyles.noBorder}>
        <label
          htmlFor=""
          className={`${personalStyles.label} ${utilStyles.colorText}`}
        >
          {" "}
          <div className={personalStyles.labelContainer}>
            <span>Combien de places libres disposez-vous ?</span>
            {getError(validDrivers.hasValidFreePlace)}
          </div>
          <input
            className={`
              ${personalStyles.inputOne}
              ${!validDrivers.hasValidFreePlace && utilStyles.containerError}
            `}
            type="number"
            maxLength={2}
            min={1}
            max={99}
            value={driversInfo.freePlaces}
            onChange={handleFreePlaces}
          />
        </label>
        <label
          htmlFor=""
          className={`${personalStyles.label} ${utilStyles.colorText}`}
        >
          <div className={personalStyles.labelContainer}>
            <span>Qeul est le tarif de votre trajet par place ?</span>
            {getError(validDrivers.hasValidPricePerPlace)}
          </div>
          <div className={personalStyles.inputContainer}>
            <input
              className={`
              ${personalStyles.inputFour}
              ${
                !validDrivers.hasValidPricePerPlace && utilStyles.containerError
              }
            `}
              type="number"
              maxLength={15}
              min={0}
              value={driversInfo.pricePerPlace}
              onChange={handlePricePerPlace}
            />
            <span className={personalStyles.price}>
              <span>Fcfa</span>
            </span>
          </div>
        </label>
        <label
          htmlFor=""
          className={`${personalStyles.label} ${utilStyles.colorText}`}
        >
          {" "}
          <div className={personalStyles.labelContainer}>
            <span>Marque de la voiture</span>
            {getError(validDrivers.hasValidCarBrand)}
          </div>
          <input
            className={`
              ${personalStyles.inputOne}
               ${!validDrivers.hasValidCarBrand && utilStyles.containerError}
            `}
            type="text"
            value={driversInfo.carBrand}
            onChange={handleCarBrand}
          />
        </label>
        <label
          htmlFor=""
          className={`${personalStyles.label} ${utilStyles.colorText}`}
        >
          {" "}
          <div className={personalStyles.labelContainer}>
            <span>Carburant ?</span>
            {getError(validDrivers.hasValidFuel)}
          </div>
          <div className={personalStyles.radioButtons}>
            <div className={personalStyles.radioItem}>
              <input
                type="radio"
                name="radio"
                checked={driversInfo.fuel == "Essence" ? true : false}
                value={"Essence"}
                onClick={handleFuel}
              />
              <span>Essence</span>
            </div>
            <div className={personalStyles.radioItem}>
              <input
                type="radio"
                name="radio"
                checked={driversInfo.fuel == "Diesel" ? true : false}
                value={"Diesel"}
                onClick={handleFuel}
              />
              <span>Diesel</span>
            </div>
          </div>
        </label>
      </fieldset>
    </>
  );
};

export default Drivers;
