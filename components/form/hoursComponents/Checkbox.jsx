import utilStyles from "../../../styles/utils.module.css";
import personalStyles from "../../../styles/PersonalInfo.module.css";
import HourStyles from "../../../styles/Hour.module.css";
import { useEffect, useState } from "react";

const CheckBox = ({ value, sethoursInfo, hoursInfo }) => {
  const [checkValue, setcheckValue] = useState(false);

  function handleDays(e) {
    let val = e.target.value;
    let arr = hoursInfo.days;
    if (arr?.length >= 1) {
      for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (element === val) {
          arr.splice(index, 1);
        }
        arr[index] = element;
      }
    }
    sethoursInfo({
      ...hoursInfo,
      days: [...(arr ?? arr), val],
    });
  }
  return (
    <div
      className={`
        ${HourStyles.boxItem} ${checkValue && HourStyles.itemChecked}
      `}
    >
      <input
        className={HourStyles.checkbox}
        type="checkbox"
        value={value}
        id={value}
        onClick={handleDays}
        onChange={(e) => {
          setcheckValue(!checkValue);
        }}
      />
      <label htmlFor="checkbox" className={HourStyles.checkLabel}>
        {value}
      </label>
    </div>
  );
};

export default CheckBox;
