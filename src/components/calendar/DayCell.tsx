import { v4 as uuidv4 } from "uuid";
import styles from "./Calendar.module.scss";

export const DayCell = ({ day }: { day: Date }) => {
  const month = new Date().getMonth();
  const className = month === day.getMonth() ? "" : "other-month";
  return (
    <div
      key={uuidv4()}
      className={`${styles["calendar-cell"]} ${styles[className]}`}
    >
      {day.getDate()}
    </div>
  );
};
