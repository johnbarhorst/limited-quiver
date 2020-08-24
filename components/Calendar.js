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

  const getMonthName = month => CALENDAR_MONTHS[month]

  const selectCurrent = (date) => {
    setCurrent(date.join("-"));
  }

  return (
    <div>
      <h3>Calendar</h3>
      <div>{getMonthName(month)} {year}</div>
      <DaysContainer>
        <>
          {WEEK_DAYS.map(day => <div key={day}><p>{day}</p></div>)}
        </>
        <>
          {calendar.map((day, i) => <CalendarDay key={i} index={i} date={day} month={month} year={year} handleClick={selectCurrent} current={current} />)}
        </>
      </DaysContainer>
      <div><button onClick={() => goToPrevMonth()} >Prev</button><button onClick={() => goToNextMonth()}>Next</button></div>
      <div><button onClick={() => goToPrevYear()}>Prev Year</button><button onClick={() => goToNextYear()} >Next Year</button></div>
    </div>
  )
}


const CalendarDay = ({ date, index, today, current, month, year, handleClick = f => f }) => {
  const [, , d] = date;
  const _date = new Date(year, month, d);
  const isToday = isSameDay(_date, today);
  const isCurrent = current && isSameDay(_date, current);
  const inSameMonth = month && year && isSameMonth(_date, new Date([year, month].join("-")));

  return (
    <Day isToday={isToday} isCurrent={isCurrent} inSameMonth={inSameMonth} >
      <button onClick={() => { console.log("is today", _date); handleClick(date) }} >{d}</button>
    </Day>
  )
}

const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-content: center;
  align-items: center;
`;

const Day = styled.div`
  border: ${props => props.isToday ? '2px solid red' : '2px solid black'};
`;