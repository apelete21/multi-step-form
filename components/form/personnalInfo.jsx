import utilStyles from "../../styles/utils.module.css";
import personalStyles from "../../styles/PersonalInfo.module.css";

export default function PersonalInfo({
  personalInfo,
  setPersonalInfo,
  validForm,
}) {
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
    setPersonalInfo({
      ...personalInfo,
      phoneNumber: e.target.value,
    });
  }
  function handleCarChange(e) {
    setPersonalInfo({
      ...personalInfo,
      car: e.target.value,
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
        Informations Personnelles
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
          htmlFor="email"
          className={`${personalStyles.label} ${utilStyles.colorText}`}
        >
          <div className={personalStyles.labelContainer}>
            <span>Adresse e-mail</span>
            {getError(validForm.hasValidEmailAddress)}
          </div>
          <input
            className={`${personalStyles.inputOne} ${
              !validForm.hasValidEmailAddress && utilStyles.containerError
            }`}
            type="email"
            value={personalInfo.email}
            onChange={handleEmailChange}
          />
        </label>
        <label
          htmlFor="phoneNumber"
          className={`${personalStyles.label} ${utilStyles.colorText}`}
        >
          {" "}
          <div className={personalStyles.labelContainer}>
            <span>Numero de téléphone</span>
            {getError(validForm.hasValidPhoneNumber)}
          </div>
          <input
            className={`${personalStyles.inputOne} ${
              !validForm.hasValidPhoneNumber && utilStyles.containerError
            }`}
            type="tel"
            value={personalInfo.phoneNumber}
            onChange={handlePhoneNumberChange}
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
                value={"Oui"}
                onClick={handleCarChange}
              />
              <span>Oui</span>
            </div>
            <div className={personalStyles.radioItem}>
              <input
                type="radio"
                name="radio"
                value={"Non"}
                onClick={handleCarChange}
              />
              <span>Non</span>
            </div>
          </div>
        </label>
      </fieldset>
    </>
  );
}
