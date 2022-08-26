import { useState } from "react";
import moment from "moment";

import styles from "./Counter.module.css";

export function Counter() {
  const date = moment().format("DD-MM-YYYY");
  const dayOfWeek = moment().weekday();
  const nextDay = moment().add(1, "days").format("DD-MM-YYYY");

  /*   const [incrementDate, setIncrementDate] = useState(date);
   */
  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => console.log("")}
        >
          -
        </button>
        <span className={styles.value}>
          {date} is {dayOfWeek} and next day is {nextDay}
        </span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => console.log("")}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        {/*   <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={setIncrementDate}
          onClick={() => console.log("")}
        /> */}
        <button className={styles.button} onClick={() => console.log("")}>
          Add Amount
        </button>
        <button className={styles.asyncButton} onClick={() => console.log("")}>
          Add Async
        </button>
        <button className={styles.button} onClick={() => console.log("")}>
          Add If Odd
        </button>
      </div>
    </div>
  );
}
