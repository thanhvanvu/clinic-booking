import React, { Component } from 'react'
import { connect } from 'react-redux'
import './MedicalFacility.scss'
import '../HomePage.scss'
import Slider from 'react-slick'
import { handleGetAllClinic } from '../../../services/clinicService'
import { CommonUtils } from '../../../utils'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router-dom'

class MedicalFacility extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allClinicArr: [],
    }
  }

  async componentDidMount() {
    // call API to get all clinic
    let response = await handleGetAllClinic()
    if (response && response.errCode === 0) {
      let allClinicData = response.data

      // convert buffet image to base 64
      allClinicData.map((clinic, index) => {
        clinic.image = CommonUtils.convertBufferToBase64(clinic.image)
        return clinic
      })

      this.setState({
        allClinicArr: allClinicData,
      })
    }
  }

  handleViewClinicDetail = (id) => {
    this.props.history.push(`/detail-clinic/${id}`)
  }

  handleListViewClinic = () => {
    const { history } = this.props
    history.push(`/list-clinic`)
  }

  render() {
    let settings = this.props.settings
    let allClinicArr = this.state.allClinicArr

    return (
      <div className="section-share section-medical-facility">
        <div className="section-content">
          <div className="section-header">
            <span className="header-text">
              <FormattedMessage id="homepage.clinic.homepage-title" />
            </span>
            <button
              className="btn-more"
              onClick={() => this.handleListViewClinic()}
            >
              {' '}
              <FormattedMessage id="homepage.read-more" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
              {allClinicArr &&
                allClinicArr.length > 0 &&
                allClinicArr.map((clinic, index) => {
                  return (
                    <div
                      className="image-custom"
                      key={index}
                      onClick={() => this.handleViewClinicDetail(clinic.id)}
                    >
                      <img src={clinic.image} alt="" width="280" height="180" />
                      <div className="img-text">{clinic.name}</div>
                    </div>
                  )
                })}
            </Slider>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
)
