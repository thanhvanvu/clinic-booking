import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import * as actions from '../../store/actions'
import { connect } from 'react-redux'
import './DoctorScheduleManage.scss'
import CommonUtils from '../../utils/CommonUtils'
import Select from 'react-select'
import {
  handleSaveBulkSchedule,
  handleGetScheduleByDoctorId,
} from '../../services/userService'
import { toast } from 'react-toastify'
class DoctorScheduleManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorMessage: [],
      timeArr: [],
      previewImg: '',
      maxNumber: 0,
      doctorArray: [],
      selectedDoctor: '',
      date: '', // set default date
    }
  }

  async componentDidMount() {
    this.props.fetchTimeStart()
    this.props.getAllDoctors()
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    // everytime the prop update, do something
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let builtData = this.buildDataInputSelect(this.props.allDoctors)
      this.setState({
        doctorArray: builtData,
      })
    }

    if (prevProps.allTime !== this.props.allTime) {
      // add isSelected for every time
      let dataTime = this.props.allTime
      if (dataTime && dataTime.length > 0) {
        dataTime.map((time) => {
          time.isSelected = false
          return time
        })
      }
      this.setState({
        timeArr: dataTime,
      })
    }

    //#region  Show existing schedule on client side
    // user pick doctor ==> call api
    if (prevState.selectedDoctor !== this.state.selectedDoctor) {
      if (this.state.date === '') {
      } else {
        // call API here
        let doctorId = this.state.selectedDoctor.value
        let date = this.state.date
        let response = await handleGetScheduleByDoctorId(doctorId, date)

        if (response && response.errCode === 0) {
          await this.showExistingSchedule(response.data, this.state.timeArr)
        }
      }
    }

    // user pick date ==> call api
    if (prevState.date !== this.state.date) {
      // call API here
      let doctorId = this.state.selectedDoctor.value
      let date = this.state.date
      let response = await handleGetScheduleByDoctorId(doctorId, date)

      if (response && response.errCode === 0) {
        await this.showExistingSchedule(response.data, this.state.timeArr)
      }
    }
    //#endregion
  }

  showExistingSchedule = (existingSchedule, timeArr) => {
    for (let i = 0; i < timeArr.length; i++) {
      if (existingSchedule.length > 0) {
        for (let j = 0; j < existingSchedule.length; j++) {
          if (timeArr[i].keyMap === existingSchedule[j].timeType) {
            timeArr[i].isSelected = true
            break // break if condition is true, no more check
          } else {
            timeArr[i].isSelected = false
          }
        }
      } else {
        // if no existing schedule in database, set all Time = false
        timeArr[i].isSelected = false
      }
    }
    this.setState({
      timeArr: timeArr,
    })
  }

  buildDataInputSelect = (doctorsData) => {
    let result = []
    if (doctorsData && doctorsData.length > 0) {
      doctorsData.map((doctor, index) => {
        let imageBase64 = CommonUtils.convertBufferToBase64(doctor.image)
        let object = {}
        let label = `${doctor.firstName} ${doctor.lastName}`
        object.label = label
        object.value = doctor.id
        object.image = imageBase64
        result.push(object)

        return doctor
      })
    }
    return result
  }

  handleSelectedDoctor = (selectedDoctor) => {
    this.setState({
      previewImg: selectedDoctor.image,
      selectedDoctor: selectedDoctor,
    })
  }

  handleOnchangeInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleScheduleHour = (time) => {
    let rangeTime = this.state.timeArr
    if (rangeTime && rangeTime.length > 0) {
      rangeTime.map((timeItem) => {
        if (timeItem.keyMap === time.keyMap) {
          timeItem.isSelected = !timeItem.isSelected
        }
        return timeItem
      })
    }

    // this.setState will trigger the component to re-render
    this.setState({
      timeArr: rangeTime,
    })
  }

  handleSaveButton = async () => {
    let errorMessage = []
    let selectedTime = this.state.timeArr.filter(
      (time) => time.isSelected === true
    )

    //#region  Validate input
    if (this.state.date === '') {
      errorMessage.push('Date is invalid !')
    }
    if (!this.state.selectedDoctor) {
      errorMessage.push('Please select doctor !')
    }

    if (selectedTime && selectedTime.length === 0) {
      errorMessage.push('Please select time schedule !')
    } else {
      let inputData = []
      selectedTime.map((time, index) => {
        let object = {}
        object.doctorId = this.state.selectedDoctor.value
        object.date = this.state.date
        object.timeType = time.keyMap
        object.maxNumber = this.state.maxNumber
        inputData.push(object)

        return inputData
      })

      let response = await handleSaveBulkSchedule(inputData)
      if (response && response.errCode === 0) {
        toast.success('Create schedule successfully!')

        // reset input
        let timeArr = this.state.timeArr
        if (timeArr && timeArr.length > 0) {
          timeArr.map((timeItem) => {
            timeItem.isSelected = false
            return timeItem
          })
        }
        this.setState({
          selectedDoctor: '',
          previewImg: '',
          maxNumber: 0,
          timeArr: timeArr,
          date: new Date().toISOString().split('T')[0],
        })
      }
    }
    //#endregion

    this.setState({
      errorMessage: errorMessage,
    })
  }

  render() {
    let timeArr = this.state.timeArr
    return (
      <div className="manage-schedule-container">
        <div className="manage-schedule-title title">
          <FormattedMessage id="manage-schedule.title" />
        </div>

        <div className="container">
          <div className="row">
            {this.state.errorMessage.map((error, index) => (
              <div className="col-12 err-message" key={index}>
                {error}
              </div>
            ))}
            <div className="col-6 form-group">
              <label className="content-label">
                {' '}
                <FormattedMessage id="manage-schedule.select-doctor" />
              </label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleSelectedDoctor}
                options={this.state.doctorArray}
              />
              <div className="doctor-img mt-4">
                <img
                  hidden={this.state.previewImg === ''}
                  src={this.state.previewImg}
                  alt=""
                  width="120px"
                  height="120px"
                />
              </div>
            </div>

            <div className="col-6 form-group">
              <label className="content-label">
                <FormattedMessage id="manage-schedule.select-date" />
              </label>
              <input
                className="form-control"
                type="date"
                // min={new Date().toISOString().split('T')[0]}
                value={this.state.date}
                name="date"
                onChange={(event) => this.handleOnchangeInput(event)}
                style={{ height: '38px' }}
                disabled={!this.state.selectedDoctor}
              />
              <div className="schedule-hour">
                {timeArr &&
                  timeArr.length > 0 &&
                  timeArr.map((item, index) => (
                    <span
                      className={
                        item.isSelected === true
                          ? 'grid-item selected'
                          : 'grid-item'
                      }
                      key={index}
                      onClick={() => this.handleScheduleHour(item)}
                      tabIndex="0"
                    >
                      {item.valueEN}
                    </span>
                  ))}
              </div>
            </div>

            <button
              className="save-button"
              onClick={() => this.handleSaveButton()}
            >
              <FormattedMessage id="manage-schedule.create" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.doctors,
    allTime: state.admin.allTime,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctors: () => dispatch(actions.getAllDoctorsStart()),
    fetchTimeStart: () => dispatch(actions.fetchTimeStart()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DoctorScheduleManage)
