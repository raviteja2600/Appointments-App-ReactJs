import {format} from 'date-fns'
import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, toggleStarIcon} = props
  const {id, isStarred, title, date} = eachAppointment
  const formatDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const onClickStarIcon = () => {
    toggleStarIcon(id)
  }

  const starImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="list-container">
      <div className="list-card-container">
        <p className="title">{title}</p>
        <button
          type="button"
          data-testid="star"
          onClick={onClickStarIcon}
          className="star-button"
        >
          <img src={starImgUrl} alt="star" className="star-image" />
        </button>
      </div>
      <p className="appointment-date">Date: {formatDate}</p>
    </li>
  )
}
export default AppointmentItem
