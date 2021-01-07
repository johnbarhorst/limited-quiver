export const EventSmallDisplay = ({ event }) => {
  return (
    <div>
      <h5>{event.name}</h5>
      <p>Creator: {event.createdBy.username}</p>
    </div>
  )
}