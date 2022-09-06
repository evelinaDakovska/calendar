import { v4 as uuidv4 } from "uuid";
import styles from "./Calendar.module.scss";

export const DayCell = ({ day, month }: { day: Date; month: number }) => {
  const monthC = new Date(day).getMonth();
  const today = new Date().toDateString();
  const className =
    monthC === month
      ? day.toDateString() === today
        ? "today"
        : ""
      : "other-month";
  return (
    <div
      key={uuidv4()}
      className={`${styles["calendar-cell"]} ${styles[className]}`}
    >
      {day.getDate()}
    </div>
  );
};
