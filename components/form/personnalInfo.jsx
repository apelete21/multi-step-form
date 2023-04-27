import utilStyles from "../../styles/utils.module.css";
import personalStyles from "../../styles/PersonalInfo.module.css";
import { useEffect, useRef, useState } from "react";

import useGooglePlaceAutoComplete from "@next/font/service/google_place_autocomplete";

export default function PersonalInfo({
  personalInfo,
  setPersonalInfo,
  validForm,
}) {
  const [number, setNumber] = useState(0);
  const map_address = useRef(null);
  let autoComplete = "";
  const googleAutoCompleteSvc = useGooglePlaceAutoComplete();

  function handleNameChange(e) {
    setPersonalInfo({
      ...personalInfo,
      fullname: e.target.value,
    });
  }
  function handlesecondNameChange(e) {
    setPersonalInfo({
      ...personalInfo,
      secondName: e.target.value,
    });
  }
  function handleEmailChange(e) {
    setPersonalInfo({
      ...personalInfo,
      email: e.target.value,
    });
  }
  function handlePhoneNumberChange(e) {
    var data = e.target.value;
    if (number < data.length) {
      if (data.length == 2) {
        data = data + " ";
      } else if (data.length == 3) {
        data = personalInfo.phoneNumber + " " + data.charAt(data.length - 1);
      } else if (data.length == 6) {
        data = data + " ";
      } else if (data.length == 7) {
        data = personalInfo.phoneNumber + " " + data.charAt(data.length - 1);
      } else if (data.length == 9) {
        data = data + " ";
      } else if (data.length == 10) {
        data = personalInfo.phoneNumber + " " + data.charAt(data.length - 1);
      }
    }
    setPersonalInfo({
      ...personalInfo,
      phoneNumber: data,
    });
    setNumber(data.length);
  }
  function handleCarChange(e) {
    setPersonalInfo({
      ...personalInfo,
      car: e.target.value,
    });
  }
  function handlemapaddressChange(e) {
    setPersonalInfo({
      ...personalInfo,
      map_address: e.target.value,
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

  const handleAddressSelect = async () => {
    let addressObj = await googleAutoCompleteSvc.getFullAddress(autoComplete);
    // map_address.current.value = addressObj.address1;
    // setValue("address1", addressObj.address1);
    setPersonalInfo({
      ...personalInfo,
      map_address: `${addressObj.address1}, ${addressObj.locality}, ${addressObj.countryLong}`,
    });
    console.log(addressObj);
  };

  useEffect(() => {
    async function loadGoogleMaps() {
      // initialize the Google Place Autocomplete widget and bind it to an input element.
      // eslint-disable-next-line
      autoComplete = await googleAutoCompleteSvc.initAutoComplete(
        map_address.current,
        handleAddressSelect
      );
    }
    loadGoogleMaps();
  }, [personalInfo.map_address]);

  return (
    <>
      <h1 className={`${utilStyles.title} ${utilStyles.colorText}`}>
        Informations Personnelles
      </h1>
      <fieldset className={utilStyles.noBorder}>
        <label
          htmlFor="fullname"
          className={`${personalStyles.label} ${utilStyles.colorText}`}
        >
          {" "}
          <div className={personalStyles.labelContainer}>
            <span>Nom</span>
            {getError(validForm.hasValidName)}
          </div>
          <input
            className={`${personalStyles.inputOne} ${
              !validForm.hasValidName && utilStyles.containerError
            }`}
            type="text"
            maxLength={32}
            value={personalInfo.fullname}
            onChange={handleNameChange}
          />
        </label>
        <label
          htmlFor="fullname"
          className={`${personalStyles.label} ${utilStyles.colorText}`}
        >
          {" "}
          <div className={personalStyles.labelContainer}>
            <span>Prenom</span>
            {getError(validForm.hasValidsecondName)}
          </div>
          <input
            className={`${personalStyles.inputOne} ${
              !validForm.hasValidsecondName && utilStyles.containerError
            }`}
            type="text"
            maxLength={32}
            value={personalInfo.secondName}
            onChange={handlesecondNameChange}
          />
        </label>

        <label
          htmlFor="phoneNumber"
          className={`${personalStyles.label} ${utilStyles.colorText}`}
        >
          {" "}
          <div className={personalStyles.labelContainer}>
            <span>Votre numéro de téléphone svp ?</span>
            {getError(validForm.hasValidPhoneNumber)}
          </div>
          <div className={personalStyles.inputContainer}>
            <span className={personalStyles.code}>
              <span>+ 221</span>
            </span>
            <input
              className={`${personalStyles.inputThree} ${
                !validForm.hasValidPhoneNumber && utilStyles.containerError
              }`}
              type="tel"
              maxLength={12}
              value={personalInfo.phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
        </label>
        <label
          htmlFor="address"
          className={`${personalStyles.label} ${utilStyles.colorText}`}
        >
          <div className={personalStyles.labelContainer}>
            <span>Précisez votre addresse svp ?</span>
            {getError(validForm.hasValidEmailAddress)}
          </div>
          <input
            className={`${personalStyles.inputOne} ${
              !validForm.hasValidEmailAddress && utilStyles.containerError
            }`}
            type="address"
            value={personalInfo.email}
            onChange={handleEmailChange}
          />
        </label>
        <label
          htmlFor="address"
          className={`${personalStyles.label} ${utilStyles.colorText}`}
        >
          <div className={personalStyles.labelContainer}>
            <span>Localisation ?</span>
            {/* {getError(validForm.hasValidEmailAddress)} */}
          </div>
          <input
            className={`${personalStyles.inputOne} ${
              !validForm.hasValidEmailAddress && utilStyles.containerError
            }`}
            type="address"
            placeholder=""
            value={personalInfo.map_address}
            onChange={handlemapaddressChange}
            ref={map_address}
          />
        </label>
        <label
          htmlFor="car"
          className={`${personalStyles.label} ${utilStyles.colorText}`}
        >
          {" "}
          <div className={personalStyles.labelContainer}>
            <span>Avez-vous une voiture ?</span>
            {getError(validForm.hasValidCar)}
          </div>
          <div className={personalStyles.radioButtons}>
            <div className={personalStyles.radioItem}>
              <input
                type="radio"
                name="radio"
                defaultChecked={personalInfo.car == "Oui" ? true : false}
                value={"Oui"}
                onClick={handleCarChange}
              />
              <span>Oui</span>
            </div>
            <div className={personalStyles.radioItem}>
              <input
                type="radio"
                name="radio"
                defaultChecked={personalInfo.car == "Non" ? true : false}
                value={"Non"}
                onChange={handleCarChange}
              />
              <span>Non</span>
            </div>
          </div>
        </label>
      </fieldset>
    </>
  );
}
