import { useState, useEffect } from 'react';
import styled from 'styled-components';
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
  const [today, setToday] = useState(new Date());
  const [current, setCurrent] = useState(today);
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [calendar, setCalendar] = useState(calendarBuilder(month, year));
  // Build calendar based on selected month/year (init w/ today)
  useEffect(() => {
    setCalendar(calendarBuilder(month, year));
  }, [month, year]);

  // Change 'today' if it becomes a bad time for mogwai feeding.
  useEffect(() => {
    const now = new Date();
    const tomorrow = new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000;
    const ms = tomorrow - now;
    const dayTimeout = setTimeout(() => setToday(new Date()), ms);
    return () => {
      clearTimeout(dayTimeout);
    }
  })


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

  const goToNextYear = () => {
    setYear(year => year + 1);
  }

  const goToPrevYear = () => {
    setYear(year => year - 1);
  }

  const selectCurrent = ([y, m, d]) => {
    setCurrent(new Date(y, m, d));
  }

  return (
    <div>
      <h3>Calendar</h3>
      <div>
        <button onClick={() => goToPrevMonth()} >Prev</button>
        {CALENDAR_MONTHS[month]}
        <button onClick={() => goToNextMonth()}>Next</button>
      </div>
      <div><button onClick={() => goToPrevYear()}>Prev Year</button>{year}<button onClick={() => goToNextYear()} >Next Year</button></div>
      <DaysContainer>
        <>
          {WEEK_DAYS.map(day => <div key={day}><p>{day}</p></div>)}
        </>
        <>
          {calendar.map((date, i) =>
            <CalendarDay
              key={i}
              index={i}
              date={date}
              handleClick={selectCurrent}
              isCurrent={isSameDay(new Date(...date), current)}
              isToday={isSameDay(new Date(...date), today)}
              inSameMonth={isSameMonth(new Date(...date), new Date(year, month, 1))}
            />)}
        </>
      </DaysContainer>
    </div>
  )
}


const CalendarDay = ({ date, index, inSameMonth, isToday, isCurrent, handleClick = f => f }) => {
  const [y, m, day] = date;

  return (
    <Day className={`${isToday ? 'isToday' : ''} ${isCurrent ? 'isCurrent' : ''} ${inSameMonth ? '' : 'diff-month'}`} >
      <button onClick={() => handleClick(date)} >{day}</button>
    </Day>
  )
}

const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  gap: 1em;
`;

const Day = styled.div`
  border: 2px solid black;
  &.isToday {
    border: 2px solid red;
  }
  &.isCurrent {
    background-color: yellow;
  }
  &.diff-month {
    background-color: paleturquoise;
  }
`;