// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarted} = props
  const {id, title, date, isStarted} = appointmentDetails

  const starImgUrl = isStarted
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStart = () => {
    toggleIsStarted(id)
  }

  return (
    <li className="list-item">
      <div className="head-container">
        <p className="title">{title}</p>
        <button
          className="star-button"
          type="button"
          data-testid="star"
          onClick={onClickStart}
        >
          <img className="start" src={starImgUrl} alt="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
