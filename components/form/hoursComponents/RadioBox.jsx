import utilStyles from "../../../styles/utils.module.css";
import personalStyles from "../../../styles/PersonalInfo.module.css";
import HourStyles from "../../../styles/Hour.module.css";
import { useEffect, useState } from "react";

function RadioBox({ value, handleChoose, checkValue }) {
  return (
    <div
      className={`
        ${HourStyles.boxItem} ${
        checkValue === value ? HourStyles.itemChecked : ""
      }
      `}
    >
      <input
        className={HourStyles.radiobox}
        type="radio"
        value={value}
        id={value}
        onClick={handleChoose}
      />
      <label htmlFor="checkbox" className={HourStyles.checkLabel}>
        {value}
      </label>
    </div>
  );
}

export default RadioBox;
