import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    isActive: false,
  }

  onClickStarredButton = () => {
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }))
  }

  toggleStarIcon = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachValue => {
        if (eachValue.id === id) {
          return {...eachValue, isStarred: !eachValue.isStarred}
        }
        return eachValue
      }),
    }))
  }

  onSubmitDetails = event => {
    event.preventDefault()
    const {title, date} = this.state
    if (title.length !== 0 && date.length !== 0) {
      const newAppointmentList = {
        id: uuidv4(),
        title,
        date,
        isStarred: false,
      }

      this.setState(prevState => ({
        appointmentsList: [...prevState.appointmentsList, newAppointmentList],
        title: '',
        date: '',
      }))
    }
  }

  onChangeTitle = event => {
    this.setState({
      title: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      date: event.target.value,
    })
  }

  render() {
    const {title, date, appointmentsList, isActive} = this.state

    let filteredList
    if (isActive === true) {
      filteredList = appointmentsList.filter(
        eachValue => eachValue.isStarred === true,
      )
    } else {
      filteredList = appointmentsList
    }

    return (
      <div className="bg-container">
        <div className="card-container">
          <h1 className="main-heading">Add Appointment</h1>
          <div className="container">
            <form className="form-container" onSubmit={this.onSubmitDetails}>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                id="title"
                type="text"
                placeholder="Title"
                onChange={this.onChangeTitle}
                value={title}
                className="text-bar"
              />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <input
                id="date"
                type="date"
                onChange={this.onChangeDate}
                value={date}
                className="date"
              />
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>
          <hr className="horizontal-line" />
          <div className="heading-button-container">
            <h1 className="appointment-heading">Appointments</h1>
            <button
              type="button"
              onClick={this.onClickStarredButton}
              className="starred-button"
            >
              Starred
            </button>
          </div>
          <ul className="lists-container">
            {filteredList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                eachAppointment={eachAppointment}
                toggleStarIcon={this.toggleStarIcon}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
