import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./Calendar.module.scss";
import { DayCell } from "./DayCell";
import { DayName } from "./DayName";

export const Calendar = () => {
  const [today, setToday] = useState<Date>();
  const [month, setMonth] = useState<number>();
  const [firstDay, setFirstDay] = useState<number>();
  const [coefficient, setCoefficient] = useState<number>(0);

  useEffect(() => {
    setToday(new Date());
  }, []);

  useEffect(() => {
    if (today) {
      setMonth(today.getMonth());
    }
  }, [today]);

  useEffect(() => {
    if (today && month) {
      setFirstDay(new Date(today.getFullYear(), month, 1).getDay());
    }
  }, [today, month]);

  useEffect(() => {
    if (today && firstDay) {
      setCoefficient(2 - firstDay);
    }
  }, [today, firstDay]);

  const dayNames = Array(7)
    .fill(true)
    .map((c, index) => {
      const date = new Date(2022, 7, 1 + index);
      const dayName = date.toLocaleString("bg", {
        weekday: "short",
      });
      return <DayName key={uuidv4()} name={dayName} />;
    });

  const days = Array(35)
    .fill(true)
    .map((current, index) => {
      const currentDate = new Date();
      currentDate.setDate(index + coefficient);
      return <DayCell key={uuidv4()} day={currentDate} />;
    });

  return (
    <div className={styles.calendar}>
      {dayNames}
      {days}
    </div>
  );
};
