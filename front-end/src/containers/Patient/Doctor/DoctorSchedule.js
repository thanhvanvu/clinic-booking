import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './DoctorSchedule.scss'
import moment from 'moment'
import { LANGUAGES } from '../../../utils'
import 'moment/locale/es'
import 'moment/locale/vi'
import { handleGetScheduleByDoctorId } from '../../../services/userService'
import { CommonUtils } from '../../../utils'
import BookingModal from '../../Modal/BookingModal'
class DoctorSchedule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateArr: [],
      doctorId: '',
      date: new Date().toISOString().substr(0, 10),
      hourArr: [],
      isModalBooking: false,
      selectedScheduleHour: {},
      currentDoctor: {},
    }
  }

  async componentDidMount() {
    // create 7 days ahead for dropdown
    let arrDate = this.show7DateDropdown()
    this.setState({
      dateArr: arrDate,
    })

    // call api to get schedule hours
    // if (this.props && this.props.currentDoctor && this.props.currentDoctor.id) {
    //   let doctorId = this.props.currentDoctor.id // get doctorId from parent component and save into state
    //   let response = await handleGetScheduleByDoctorId(
    //     doctorId,
    //     this.state.date
    //   )
    //   if (response && response.errCode === 0) {
    //     // check if hour array has the past time or not ?
    //     this.setState({
    //       hourArr: response.data,
    //     })
    //   }
    // }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      let arrDate = this.show7DateDropdown()
      this.setState({
        dateArr: arrDate,
      })
    }

    if (prevProps.currentDoctor !== this.props.currentDoctor) {
      this.setState({
        currentDoctor: this.props.currentDoctor,
      })
      if (
        this.props &&
        this.props.currentDoctor &&
        this.props.currentDoctor.id
      ) {
        let doctorId = this.props.currentDoctor.id // get doctorId from parent component and save into state
        let response = await handleGetScheduleByDoctorId(
          doctorId,
          this.state.date
        )
        if (response && response.errCode === 0) {
          //#region  Filter the hour array if it has the past time
          let todayDate = moment(new Date()).format('YYYY-MM-DD')
          let currentTime = parseInt(moment(new Date()).format('HH'))
          let hourArr = response.data

          if (hourArr && hourArr[0] && todayDate === hourArr[0].date) {
            hourArr = hourArr.filter((hour) => {
              let timeRange = hour.timeTypeData.valueEN
              let time = parseInt(timeRange.split('-')[0].split(':')[0])
              if (time > currentTime) {
                return true
              }
            })
          }
          //#endregion

          this.setState({
            hourArr: hourArr,
          })
        }
      }
    }

    // if user pick another date, call api to get hour schedule
    if (prevState.date !== this.state.date) {
      // call api to get schedule hours
      if (
        this.props &&
        this.props.currentDoctor &&
        this.props.currentDoctor.id
      ) {
        let doctorId = this.props.currentDoctor.id // get doctorId from parent component and save into state
        let response = await handleGetScheduleByDoctorId(
          doctorId,
          this.state.date
        )
        if (response && response.errCode === 0) {
          //#region  Filter the hour array if it has the past time
          let todayDate = moment(new Date()).format('YYYY-MM-DD')
          let currentTime = parseInt(moment(new Date()).format('HH'))
          let hourArr = response.data

          if (hourArr && hourArr[0] && todayDate === hourArr[0].date) {
            hourArr = hourArr.filter((hour) => {
              let timeRange = hour.timeTypeData.valueEN
              let time = parseInt(timeRange.split('-')[0].split(':')[0])
              console.log(time)
              if (time > currentTime) {
                return true
              }
            })
          }
          //#endregion

          this.setState({
            hourArr: hourArr,
          })
        }
      }
    }
  }

  show7DateDropdown = () => {
    let arrDate = []
    let today = new Date()
    for (let i = 0; i < 7; i++) {
      let object = {}
      if (LANGUAGES.VI === this.props.language) {
        object.label = moment(today)
          .locale('vi')
          .add(i, 'days')
          .format('dddd - DD/MM')
        object.label = CommonUtils.capitalizerFirstLetter(object.label)
        object.value = moment(today).add(i, 'days').format('YYYY-MM-DD')
        arrDate.push(object)
      }

      if (LANGUAGES.EN === this.props.language) {
        object.label = moment(today)
          .locale('en')
          .add(i, 'days')
          .format('ddd - DD/MM')
        object.value = moment(today).add(i, 'days').format('YYYY-MM-DD')
        arrDate.push(object)
      }

      if (LANGUAGES.ES === this.props.language) {
        object.label = moment(today)
          .locale('es')
          .add(i, 'days')
          .format('ddd - DD/MM')
        object.label = CommonUtils.capitalizerFirstLetter(object.label)
        object.value = moment(today).add(i, 'days').format('YYYY-MM-DD')
        arrDate.push(object)
      }
    }

    return arrDate
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleClickScheduleTime = (hour) => {
    console.log(hour)
    this.setState({
      isModalBooking: true,
      selectedScheduleHour: hour,
    })
  }

  closeBookingModal = () => {
    this.setState({
      isModalBooking: false,
    })
  }
  render() {
    let allDates = this.state.dateArr
    let hourArr = this.state.hourArr
    return (
      <>
        <div className="schedule-container">
          <select
            name="date"
            onChange={(event) => this.handleOnChange(event)}
            className="schedule-date "
          >
            {allDates &&
              allDates.length > 0 &&
              allDates.map((date, index) => {
                return (
                  <option value={date.value} key={index} className="option">
                    {date.label}
                  </option>
                )
              })}
          </select>

          <div className="schedule-label">
            <i className="far fa-calendar-alt"></i>
            <FormattedMessage id="homepage.outstanding-doctor.schedule" />
          </div>
          <div className="schedule-hour">
            {hourArr && hourArr.length > 0 ? (
              <>
                <div className="hours">
                  {hourArr.map((hour, index) => (
                    <span
                      className="grid-item"
                      key={index}
                      onClick={() => this.handleClickScheduleTime(hour)}
                    >
                      {hour.timeTypeData.valueEN}
                    </span>
                  ))}
                </div>

                <div className="book-free">
                  <span>
                    <FormattedMessage id="homepage.outstanding-doctor.free1" />
                  </span>{' '}
                  <i className="far fa-hand-point-up"></i>{' '}
                  <span>
                    <FormattedMessage id="homepage.outstanding-doctor.free2" />
                  </span>
                </div>
              </>
            ) : (
              <div className="no-schedule">
                <FormattedMessage id="homepage.outstanding-doctor.no-schedule" />
              </div>
            )}
          </div>
        </div>

        <BookingModal
          isModalBooking={this.state.isModalBooking}
          closeBookingModal={this.closeBookingModal}
          selectedScheduleHour={this.state.selectedScheduleHour}
          doctorId={this.state.currentDoctor.id}
        />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    currentDoctor: state.homepage.currentDoctor,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule)
