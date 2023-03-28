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

function Form({ step, setStep, formData, updateFormData }) {
  const router = useRouter();
  const [personalInfo, setPersonalInfo] = useState({
    ...formData.personalInfo,
  });
  const [hoursInfo, sethoursInfo] = useState({
    ...formData.hoursInfo,
  });
  const [validForm, setValidForm] = useState({
    hasValidName: true,
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

  function handleSubmit(e) {
    e.preventDefault();
    if (step == 1) {
      return setStep(step + 1);
    } else if (step == 2) {
      formValidation();
    } else if (step == 3) {
      dataValidation();
    }
  }
  function handleGoBack(e) {
    e.preventDefault();
    setStep(step - 1);
  }

  function dataValidation() {
    console.log(hoursInfo);
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
      setStep((s) => s + 1);
    }
  }

  function formValidation() {
    let validCar = true;
    if (personalInfo.car == "") validCar = false;
    let hasValidName = nameRegex.test(personalInfo.fullname);
    let hasValidEmailAddress = emailRegex.test(personalInfo.email);
    let hasValidPhoneNumber = phoneNumberRegex.test(personalInfo.phoneNumber);
    if (personalInfo.name == "") hasValidName = undefined;
    if (personalInfo.email == "") hasValidEmailAddress = undefined;
    if (personalInfo.phoneNumber == "") hasValidPhoneNumber = undefined;

    setValidForm({
      hasValidName,
      hasValidEmailAddress,
      hasValidPhoneNumber,
      hasValidCar: validCar,
    });
    console.log(validForm);
    if (
      [hasValidName, hasValidEmailAddress, hasValidPhoneNumber, validCar].every(
        (value) => value == true
      )
    ) {
      updateFormData(personalInfo);
      setStep(step + 1);
    }
  }

  const Redo = () => {
    if (step >= 4) {
      setStep(5);
      router.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {step > 1 && step < 4 && (
        <p>
          <b>Etape - {step} </b>
        </p>
      )}

      {step == 1 && <Intro />}

      {step == 2 && (
        <PersonalInfo
          personalInfo={personalInfo}
          setPersonalInfo={setPersonalInfo}
          validForm={validForm}
        />
      )}

      {step == 3 && (
        <Hours
          hoursInfo={hoursInfo}
          sethoursInfo={sethoursInfo}
          validData={validData}
        />
      )}

      {step == 4 && <ThankYou />}

      {step == 5 && (
        <>
          {" "}
          <div style={{
            textAlign: "center",
            fontSize: "2rem"
          }}>
            <p>Patientez svp, rechargement...</p>
          </div>
        </>
      )}

      <div className={formStyles.bottom}>
        <button
          type="button"
          className={step >= 2 ? formStyles.buttonGoBack : formStyles.firstPage}
          onClick={handleGoBack}
        >
          Go Back
        </button>
        <button
          type="submit"
          className={`${formStyles.bottomButton} ${
            step == 3 && formStyles.buttonConfirm
          }`}
          onClick={Redo}
        >
          {step == 3
            ? "Confirm"
            : step == 4
            ? "Soumttre un autre"
            : "Next Step"}
        </button>
      </div>
    </form>
  );
}

export default Form;
