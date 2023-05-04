import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import './DoctorListView.scss'
import { connect } from 'react-redux'
import HeaderHomePage from '../../HomePage/HeaderHomePage'
import FooterHomePage from '../../HomePage/FooterHomePage'
import { CommonUtils } from '../../../utils'
import { handleGetAllDoctorsDetail } from '../../../services/userService'
class DoctorListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      doctorArr: [],
    }
  }

  async componentDidMount() {
    // call API to get all Doctor in the database
    let response = await handleGetAllDoctorsDetail()
    if (response && response.errCode === 0) {
      let doctorArr = response.data
      let doctorArrFiltered = []

      doctorArr.map((doctor, index) => {
        let object = {}
        object.doctorId = doctor.doctorId
        object.name =
          doctor.doctorData.firstName + ' ' + doctor.doctorData.lastName
        object.image = CommonUtils.convertBufferToBase64(
          doctor.doctorData.image
        )
        object.clinicName = doctor.clinicData.name
        object.specialist = doctor.specialistData.tittle
        object.position = doctor.doctorData.positionData

        doctorArrFiltered.push(object)
        return doctorArrFiltered
      })
      this.setState({
        doctorArr: doctorArrFiltered,
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleListViewDoctor = (doctorId) => {
    const { history } = this.props
    history.push(`/detail-doctor/${doctorId}`)
  }

  render() {
    let doctorArr = this.state.doctorArr

    return (
      <>
        <HeaderHomePage />
        <div className="container-list-view-doctor wrapper">
          {doctorArr &&
            doctorArr.length > 0 &&
            doctorArr.map((doctor, index) => {
              return (
                <div
                  className="doctor-detail"
                  key={index}
                  onClick={() => this.handleListViewDoctor(doctor.doctorId)}
                >
                  <img className="doctor-image" src={doctor.image} alt="" />
                  <div className="doctor-info">
                    <div className="doctor-name">{doctor.name}</div>
                    <div className="doctor-specialist">{doctor.specialist}</div>
                    <div className="doctor-clinic">{doctor.clinicName}</div>
                  </div>
                </div>
              )
            })}
        </div>
        <FooterHomePage />
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorListView)
