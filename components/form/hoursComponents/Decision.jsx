import utilStyles from "../../../styles/utils.module.css";
import personalStyles from "../../../styles/PersonalInfo.module.css";
import HourStyles from "../../../styles/Hour.module.css";
import { useEffect, useState } from "react";

function Decision({ setData, data }) {
  
  const [choosen, setChoosen] = useState()

  function handleChoose(e) {
    setChoosen(e.target.value)
    if (e.target.value !== "custom") {
      setData({
        ...data,
        finalDecision: e.target.value,
      });
    } else {
      setData({
        ...data,
        finalDecision: "",
      });
    }
  }

  function handleChange(e) {
    
    if (choosen === "custom") {
      setData({
        ...data,
        finalDecision: e.target.value,
      });
    }
  }

  return (
    <>
      <div className={personalStyles.radioItem}>
        <input
          type="radio"
          name="radio"
          checked={data.finalDecision == "Oui" ? true : false}
          value={"Oui"}
          onClick={handleChoose}
        />
        <span>Oui</span>
      </div>
      <div className={personalStyles.radioItem}>
        <input
          type="radio"
          name="radio"
          checked={choosen == "Non" ? true : false}
          value={"Non"}
          onClick={handleChoose}
        />
        <span>Non</span>
      </div>
      {choosen === "Non" && <div className={personalStyles.radioItem}>
        <input
          type="radio"
          name="radio"
          value={"custom"}
          checked={choosen === "custom" ? true : false}
          onClick={handleChoose}
        />
        <span>Raison</span>
        <input
          className={personalStyles.inputTwo}
          type="text"
          placeholder="..."
          maxLength={225}
          onChange={handleChange}
        />
      </div>}
    </>
  );
}

export default Decision;
