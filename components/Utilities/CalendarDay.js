import styled from 'styled-components';

export const CalendarDay = ({ date, index, inSameMonth, isToday, isCurrent, handleClick = f => f }) => {
  const [y, m, day] = date;

  return (
    <Day
      className={`
      ${isToday ? 'isToday' : ''} 
      ${isCurrent ? 'isCurrent' : ''} 
      ${inSameMonth ? '' : 'diff-month'}
      `}
      onClick={(e) => { e.preventDefault(); handleClick(date) }}
    ><b>{day}</b></Day>
  )
}

const Day = styled.button`
  color: black;
  height: 4rem;
  width: 4rem;
  background: none;
  border: none;
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