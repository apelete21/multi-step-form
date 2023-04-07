import formStyles from "../../styles/Form.module.css";
import {
  nameRegex,
  emailRegex,
  phoneNumberRegex,
} from "../../constants/regex/regexConstants";
import { useState } from "react";
import Intro from "./intro";
import PersonalInfo from "./personnalInfo";
import Hours from "./horaires";
import ThankYou from "../thanks/ThankYou";
import { useRouter } from "next/router";
import Drivers from "./drivers";
import Passengers from "./passengers";

function Form({ step, setStep, formData, updateFormData }) {
  const router = useRouter();
  const [personalInfo, setPersonalInfo] = useState({
    ...formData.personalInfo,
  });
  const [driversInfo, setDriversInfo] = useState({
    ...formData.driversInfo,
  });
  const [passengersInfo, setPassengersInfo] = useState({
    ...formData.passengersInfo,
  });
  const [hoursInfo, sethoursInfo] = useState({
    ...formData.hoursInfo,
  });
  const [validForm, setValidForm] = useState({
    hasValidName: true,
    hasValidsecondName: true,
    hasValidSurname: true,
    hasValidEmailAddress: true,
    hasValidPhoneNumber: true,
    hasValidCar: true,
  });
  const [validData, setValidData] = useState({
    hasValidDays: true,
    hasValidHome: true,
    hasValidWork: true,
    hasValidDecision: true,
  });
  const [validDrivers, setValidDrivers] = useState({
    hasValidFreePlace: true,
    hasValidPricePerPlace: true,
    hasValidCarBrand: true,
    hasValidFuel: true,
  });

  const [validPassengers, setValidPassengers] = useState({
    hasValidTripPrice: true,
  });

  function handleGoBack(e) {
    e.preventDefault();
    if (personalInfo.car === "Non" && step == 4) {
      return setStep(step - 2);
    } else if (personalInfo.car === "Oui" && step == 3) {
      return setStep(step - 1);
    } else if (personalInfo.car === "Oui" && step == 5) {
      return setStep(step - 2);
    } else setStep(step - 1);
  }

  function driversValidation() {
    let validFreePlace = true;
    let validPricePerPlace = true;
    let validCarBrand = true;
    let validFuel = true;
    if (driversInfo.freePlaces == "") {
      validFreePlace = false;
    }
    if (driversInfo.pricePerPlace == "") {
      validPricePerPlace = false;
    }
    if (driversInfo.carBrand == "") {
      validCarBrand = false;
    }
    if (driversInfo.fuel == "") {
      validFuel = false;
    }
    setValidDrivers({
      hasValidFreePlace: validFreePlace,
      hasValidPricePerPlace: validPricePerPlace,
      hasValidCarBrand: validCarBrand,
      hasValidFuel: validFuel,
    });
    if (
      [validFreePlace, validFuel, validPricePerPlace, validCarBrand].every(
        (value) => value == true
      )
    ) {
      updateFormData(driversInfo);
      if (personalInfo.car === "Oui" && step == 3) {
        setStep(step + 2);
      }
    }
  }

  function passengersValidation() {
    let validTripPrice = true;
    if (passengersInfo.tripPrice == "") {
      validTripPrice = false;
    }
    setValidPassengers({
      hasValidTripPrice: validTripPrice,
    });
    if (validTripPrice == true) {
      updateFormData(passengersInfo);
      setStep(step + 1);
    }
  }

  function dataValidation() {
    let validDay = true;
    let validHome = true;
    let validWork = true;
    let validDecision = true;
    if (hoursInfo.days?.length == 0) {
      validDay = false;
    }
    if (hoursInfo.homeDeparture == "") {
      validHome = false;
    }
    if (hoursInfo.WorkDeparture == "") {
      validWork = false;
    }
    if (hoursInfo.finalDecision == "") {
      validDecision = false;
    }
    setValidData({
      hasValidDays: validDay,
      hasValidHome: validHome,
      hasValidWork: validWork,
      hasValidDecision: validDecision,
    });
    if (
      [validDay, validDecision, validHome, validWork].every(
        (value) => value == true
      )
    ) {
      updateFormData(hoursInfo);
      setStep(step + 1);
    }
  }

  function formValidation() {
    let validCar = true;
    if (personalInfo.car == "") validCar = false;
    let hasValidName = nameRegex.test(personalInfo.fullname);
    let hasValidsecondName = nameRegex.test(personalInfo.secondName);
    let hasValidEmailAddress = emailRegex.test(personalInfo.email);
    let hasValidPhoneNumber = phoneNumberRegex.test(personalInfo.phoneNumber);
    if (personalInfo.fullname == "") hasValidName = undefined;
    if (personalInfo.secondName == "") hasValidsecondName = undefined;
    if (personalInfo.email == "") hasValidEmailAddress = undefined;
    if (personalInfo.phoneNumber == "") hasValidPhoneNumber = undefined;

    setValidForm({
      hasValidName,
      hasValidsecondName,
      hasValidEmailAddress,
      hasValidPhoneNumber,
      hasValidCar: validCar,
    });
    if (
      [
        hasValidName,
        hasValidsecondName,
        hasValidEmailAddress,
        hasValidPhoneNumber,
        validCar,
      ].every((value) => value == true)
    ) {
      updateFormData(personalInfo);
      if (personalInfo.car === "Oui") {
        setStep(step + 1);
      } else if (personalInfo.car === "Non") {
        setStep(step + 2);
      }
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (step == 1) {
      setStep(step + 1);
    } else if (step == 2) {
      formValidation();
    } else if (step == 3) {
      driversValidation();
    } else if (step == 4) {
      passengersValidation();
    } else if (step == 5) {
      dataValidation();
    }
  }

  const Redo = () => {
    if (step >= 6) {
      router.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {step == 1 && <Intro />}

      {step == 2 && (
        <PersonalInfo
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
          validForm={validForm}
        />
      )}

      {step == 3 && (
        <Drivers
          driversInfo={driversInfo}
          setDriversInfo={setDriversInfo}
          validDrivers={validDrivers}
        />
      )}

      {step == 4 && (
        <Passengers
          passengersInfo={passengersInfo}
          setPassengersInfo={setPassengersInfo}
          validPassengers={validPassengers}
        />
      )}

      {step == 5 && (
        <Hours
          hoursInfo={hoursInfo}
          sethoursInfo={sethoursInfo}
          validData={validData}
        />
      )}

      {step == 6 && <ThankYou />}

      {step == 7 && (
        <>
          {" "}
          <div
            style={{
              textAlign: "center",
              fontSize: "2rem",
            }}
          >
            <p>Patientez svp...</p>
          </div>
        </>
      )}

      <div className={formStyles.bottom}>
        <button
          type="button"
          className={step >= 2 ? formStyles.buttonGoBack : formStyles.firstPage}
          onClick={handleGoBack}
        >
          Retour
        </button>
        <button
          type="submit"
          className={`${formStyles.bottomButton} ${
            step == 5 && formStyles.buttonConfirm
          }`}
          onClick={Redo}
        >
          {step == 5 ? "Soumettre" : step >= 6 ? "Nouvelle requête" : "Suivant"}
        </button>
      </div>
    </form>
  );
}

export default Form;
