import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { getTasks } from "../../slices/taskSlice";
import styles from "./Calendar.module.scss";

export const DayCell = ({
  day,
  month,
  openModal,
}: {
  day: Date;
  month: number;
  openModal: Dispatch<SetStateAction<Date | undefined>>;
}) => {
  const tasks = useSelector(getTasks);
  const [currentDayTasks, setCurrentDayTasks] = useState<string[]>();
  const monthC = new Date(day).getMonth();
  const today = new Date().toDateString();

  useEffect(() => {
    if (tasks[day.toLocaleDateString()]) {
      setCurrentDayTasks(tasks[day.toLocaleDateString()]);
    }
  }, [day, tasks]);

  const className =
    monthC === month
      ? day.toDateString() === today
        ? "today"
        : ""
      : "other-month";

  return (
    <div
      key={uuidv4()}
      onClick={() => openModal(day)}
      className={`${styles["calendar-cell"]} ${styles[className]}`}
    >
      {day.getDate()}
      {currentDayTasks && <div>{currentDayTasks.length} tasks</div>}
    </div>
  );
};
