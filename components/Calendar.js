import { useState, useEffect } from 'react';
import {
  isDate,
  isSameDay,
  isSameMonth,
  getDateISO,
  getNextMonth,
  getPreviousMonth,
  WEEK_DAYS,
  CALENDAR_MONTHS,
  calendarBuilder
} from 'utils/dateHelpers';

export const Calendar = () => {
  const today = new Date()
  const [current, setCurrent] = useState(today);
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getFullYear());
  const [calendar, setCalendar] = useState();

  useEffect(() => {
    setCalendar(calendarBuilder(month, year));
  }, []);

  const goToPrevMonth = () => {
    const { prevMonth, prevMonthYear } = getPreviousMonth(month, year);
    setMonth(prevMonth);
    setYear(prevMonthYear);
  }

  const goToNextMonth = () => {
    const { nextMonth, nextMonthYear } = getNextMonth(month, year);
    setMonth(nextMonth);
    setYear(nextMonthYear);
  }

  return (
    <div>
      <h3>Calendar</h3>
      <div>{Object.keys(WEEK_DAYS).map(day => <span key={day}>{WEEK_DAYS[day]}</span>)}</div>
      <div>{month} {year}</div>
      <div><button onClick={() => goToPrevMonth()} >Prev</button><button onClick={() => goToNextMonth()}>Next</button></div>

    </div>
  )
}
