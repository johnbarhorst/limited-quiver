import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { CalendarDay } from 'components';
import {
  isDate,
  isSameDay,
  isSameMonth,
  getDateISO,
  getNextMonth,
  getPreviousMonth,
  WEEK_DAYS_SHORT,
  CALENDAR_MONTHS_FULL,
  calendarBuilder
} from 'utils/dateHelpers';

export const Calendar = () => {
  // Remember: Values from and Date.getDay() and .getMonth() are array style.
  // Years are not. 

  // Init with current date
  const [today, setToday] = useState(new Date());

  // Init current selection with todays date.
  const [current, setCurrent] = useState(today);

  // Init month and year on todays month and year.
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  // Build calendar based on selected month/year (init w/ today)
  const [calendar, setCalendar] = useState(calendarBuilder(month, year));
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

  // Click handlers
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
    <CalendarContainer>
      <ControlsContainer>
        <Controls>
          <button onClick={() => goToPrevMonth()}>&#9664;</button>
          <h3>{CALENDAR_MONTHS_FULL[month]}</h3>
          <button onClick={() => goToNextMonth()}>&#9654;</button>
        </Controls>
        <Controls>
          <button onClick={() => goToPrevYear()}>&#9664;</button>
          <h3>{year}</h3>
          <button onClick={() => goToNextYear()}>&#9654;</button>
        </Controls>
      </ControlsContainer>
      <DaysContainer>
        <>
          {WEEK_DAYS_SHORT.map(day => <div key={day}><p>{day}</p></div>)}
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
    </CalendarContainer>
  )
}

const CalendarContainer = styled.div`
  max-width: 30rem;
`;

const ControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    border: none;
    background: none;
  }
  p {
    margin: 0;
  }

`;

const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 4rem);
  text-align: center;
  gap: .25rem;
`;
