import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import './DoctorListView.scss'
import { connect } from 'react-redux'
import HeaderHomePage from '../../HomePage/HeaderHomePage'
import FooterHomePage from '../../HomePage/FooterHomePage'
import { CommonUtils } from '../../../utils'
import { handleGetAllDoctorsDetail } from '../../../services/userService'

import PageSpinner from '../../../components/PageSpinner'

class DoctorListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      doctorArr: [],
      isLoading: false,
    }
  }

  async componentDidMount() {
    // call API to get all Doctor in the database
    this.setState({
      isLoading: true,
    })
    let response = await handleGetAllDoctorsDetail()

    if (response && response.errCode === 0) {
      let doctorArr = response.data
      let doctorArrFiltered = []

      doctorArr.map((doctor, index) => {
        let object = {}
        let image = doctor.doctorData.image
        object.doctorId = doctor.doctorId

        if (doctor.doctorData) {
          object.name =
            doctor.doctorData.firstName + ' ' + doctor.doctorData.lastName
          object.image = CommonUtils.convertBufferToBase64(image)
          object.position = doctor.doctorData.positionData
        }

        if (doctor.clinicData) {
          object.clinicName = doctor.clinicData.name
        }

        if (doctor.specialistData) {
          object.specialist = doctor.specialistData.tittle
        }

        doctorArrFiltered.push(object)
        return doctorArrFiltered
      })
      this.setState({
        doctorArr: doctorArrFiltered,
        isLoading: false,
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
    let isLoading = this.state.isLoading
    return (
      <>
        <div className="doctor-list-view">
          <HeaderHomePage />

          {isLoading === true && <PageSpinner />}

          <div className="container-list-view-doctor wrapper">
            {doctorArr &&
              doctorArr.length > 0 &&
              doctorArr.map((doctor, index) => {
                return (
                  <div
                    className="doctor-detail-information"
                    key={index}
                    onClick={() => this.handleListViewDoctor(doctor.doctorId)}
                  >
                    <img className="doctor-image" src={doctor.image} alt="" />
                    <div className="doctor-info">
                      <div className="doctor-name">{doctor.name}</div>
                      <div className="doctor-specialist">
                        {doctor.specialist}
                      </div>
                      <div className="doctor-clinic">{doctor.clinicName}</div>
                    </div>
                  </div>
                )
              })}
          </div>
          <FooterHomePage />
        </div>
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
