import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './ClinicDetail.scss'
import DoctorScheduleClinicInfo from '../../../components/DoctorScheduleClinicInfo'
import { handleGetDoctorInSpecialist } from '../../../services/specialistService'
class ClinicDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredArrDoctor: [],
    }
  }

  async componentDidMount() {
    let specialistId = this.props.match.params.id
    this.setState({
      specialistId: specialistId,
    })

    let doctorResponse = await handleGetDoctorInSpecialist(specialistId)
    if (doctorResponse && doctorResponse.errCode === 0) {
      let dataDoctor = doctorResponse.data

      this.setState({
        filteredArrDoctor: dataDoctor,
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let filteredArrDoctor = this.state.filteredArrDoctor
    return (
      <>
        {filteredArrDoctor &&
          filteredArrDoctor.length > 0 &&
          filteredArrDoctor.map((doctor, index) => {
            return (
              /* <div className="specialist-content">
                    <div className="specialist-content-left">
                      <ProfileDoctor
                        doctorId={doctor.doctorId}
                        cityData={doctor.clinicData.cityData}
                        key={index}
                        specialist={true}
                      />
                    </div>
                    <div className="specialist-content-right">
                      <div className="doctor-schedule">
                        <DoctorSchedule
                          doctorId={doctor.doctorId}
                          key={index}
                        />
                      </div>
                      <DoctorClinicInfo
                        doctorId={doctor.doctorId}
                        specialist={true}
                      />
                    </div>
                  </div> */

              <DoctorScheduleClinicInfo doctor={doctor} key={index} />
            )
          })}
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

export default connect(mapStateToProps, mapDispatchToProps)(ClinicDetail)
