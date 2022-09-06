import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./Calendar.module.scss";
import { DayCell } from "./DayCell";
import { DayName } from "./DayName";

export const Calendar = () => {
  const [today, setToday] = useState<Date>();
  const [month, setMonth] = useState<number>(0);
  const [year, setYear] = useState<number>(0);
  const [firstDay, setFirstDay] = useState<number>(0);
  const [coefficient, setCoefficient] = useState<number>(0);

  useEffect(() => {
    setToday(new Date());
  }, []);

  useEffect(() => {
    if (today) {
      setMonth(today.getMonth());
      setYear(today.getFullYear());
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

  const days = useMemo(
    () =>
      year !== 0 &&
      month !== 0 &&
      Array(35)
        .fill(true)
        .map((current, index) => {
          const currentDate = new Date(year, month);
          currentDate.setDate(index + coefficient);
          return <DayCell key={uuidv4()} day={currentDate} month={month} />;
        }),
    [year, month, coefficient]
  );

  return (
    <>
      <button
        className={styles.changeMonth}
        onClick={() => setMonth((prev) => prev - 1)}
      >
        previous month
      </button>
      <button
        className={styles.changeMonth}
        onClick={() => setMonth((prev) => prev + 1)}
      >
        next month
      </button>
      <h3>
        {new Date(year, month).toLocaleString("en-US", {
          month: "long",
        })}{" "}
        {year}
      </h3>
      <div className={styles.calendar}>
        {dayNames}
        {days}
      </div>
    </>
  );
};
