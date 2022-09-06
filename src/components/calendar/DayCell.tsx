import { v4 as uuidv4 } from "uuid";
import styles from "./Calendar.module.scss";

export const DayCell = ({ day }: { day: Date }) => {
  const month = new Date().getMonth();
  const dayC = new Date().getDate();
  const classNameMonth =
    month === day.getMonth()
      ? day.getDate() === dayC
        ? "today"
        : ""
      : "other-month";
  return (
    <div
      key={uuidv4()}
      className={`${styles["calendar-cell"]} ${styles[classNameMonth]}`}
    >
      {day.getDate()}
    </div>
  );
};
