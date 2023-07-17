// Write your code here
import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsStarted = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointments => {
        if (id === eachAppointments.id) {
          return {...eachAppointments, isStarted: !eachAppointments.isStarted}
        }
        return eachAppointments
      }),
    }))
  }

  onClickFilter = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointments = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarted: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointments],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  getFilteredAppointmentLists = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStarted === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filtered' : 'filter-empty'
    const filteredAppointmentLists = this.getFilteredAppointmentLists()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="appointments-container">
            <div className="add-appointments-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="heading">Add Appointment</h1>
                <label className="label" htmlFor="title">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  className="input"
                  placeholder="Title"
                  autoComplete="OFF"
                  onChange={this.onChangeTitleInput}
                />
                <label className="label" htmlFor="date">
                  DATE
                </label>
                <input
                  type="date"
                  id="date"
                  value={dateInput}
                  className="input"
                  onChange={this.onChangeDateInput}
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
            <hr className="line" />
            <div className="filter-container">
              <h1 className="appointments-heading">Appointments</h1>
              <button
                className={`filter-style ${filterClassName}`}
                type="button"
                onClick={this.onClickFilter}
              >
                Starred
              </button>
            </div>
            <ul className="list">
              {filteredAppointmentLists.map(eachAppointment => (
                <AppointmentItem
                  key={eachAppointment.id}
                  appointmentDetails={eachAppointment}
                  toggleIsStarted={this.toggleIsStarted}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
