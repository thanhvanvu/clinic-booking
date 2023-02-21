import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import HeaderHomePage from '../../HomePage/HeaderHomePage'
import { getDetailDoctorById } from '../../../services/userService'
import { CommonUtils } from '../../../utils'
import './DoctorDetail.scss'
class DoctorDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previewImg: '',
      doctor: [],
    }
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let doctorId = this.props.match.params.id
      let response = await getDetailDoctorById(doctorId)

      if (response && response.errCode === 0) {
        this.setState({
          previewImg: CommonUtils.convertBufferToBase64(response.data.image),
          doctor: response.data,
        })
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let doctor = this.state.doctor
    console.log(doctor)
    return (
      <>
        {/* show header menu */}
        <HeaderHomePage isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="doctor-detail-summary wrapper">
            <div className="doctor-image">
              <img
                src={this.state.previewImg}
                alt=""
                width="100px"
                height="100px"
              />
            </div>
            <div className="doctor-summary">
              <div className="doctor-summary-title">
                {doctor && doctor.positionData
                  ? doctor.positionData.valueEN +
                    ', ' +
                    doctor.firstName +
                    ' ' +
                    doctor.lastName
                  : ''}
              </div>
              <div className="doctor-summary-content">
                Nguyên Trưởng phòng chỉ đạo tuyến tại Bệnh viện Da liễu Trung
                ương Bác sĩ từng công tác tại Bệnh viện Da liễu Trung ương
                Nguyên Tổng Thư ký Hiệp hội Da liễu Việt Nam
              </div>
            </div>
          </div>
        </div>
        <div className="doctor-appointment">
          <div className="appointment wrapper"></div>
        </div>
        <div className="doctor-information">
          {doctor && doctor.Markdown && doctor.Markdown.contentHTML && (
            <div
              className="doctor-information-content wrapper"
              dangerouslySetInnerHTML={{ __html: doctor.Markdown.contentHTML }}
            ></div>
          )}
        </div>
        <div className="doctor-feedback"></div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail)
