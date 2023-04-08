import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './DoctorClinicInfo.scss'
import { LANGUAGES } from '../../../utils'
import {
  getDetailDoctorById,
  handleGetDoctorClinicInfo,
} from '../../../services/userService'
class DoctorClinicInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      doctorInfo: '',
      doctorClinicInfo: '',
      isShowPriceInfo: false,
    }
  }

  async componentDidMount() {
    if (this.props.doctorId) {
      let doctorId = this.props.doctorId
      let response = await handleGetDoctorClinicInfo(doctorId)
      if (response && response.errCode === 0) {
        let doctorData = response.data
        if (doctorData && doctorData.clinicData) {
          let clinicInfo = doctorData.clinicData
          this.setState({
            doctorData: doctorData,
            doctorClinicInfo: clinicInfo,
          })
        }
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctorId !== this.props.doctorId) {
      let doctorId = this.props.doctorId
      let response = await handleGetDoctorClinicInfo(doctorId)
      if (response && response.errCode === 0) {
        let doctorData = response.data
        if (doctorData && doctorData.clinicData) {
          let clinicInfo = doctorData.clinicData
          this.setState({
            doctorData: doctorData,
            doctorClinicInfo: clinicInfo,
          })
        }
      }
    }
  }

  handleOpenPriceInfo = () => {
    this.setState({
      isShowPriceInfo: true,
    })
  }

  handleClosePriceInfo = () => {
    this.setState({
      isShowPriceInfo: false,
    })
  }

  render() {
    let clinincInfo = this.state.doctorClinicInfo
    let doctorData = this.state.doctorData
    let language = this.props.language
    let specialist = this.props.specialist
    let price = ''
    let payment = ''
    if (doctorData && doctorData.priceData) {
      if (language === LANGUAGES.VI) {
        price = doctorData.priceData.valueVI
        payment = doctorData.paymentData.valueVI
      } else if (language === LANGUAGES.EN) {
        price = doctorData.priceData.valueEN
        payment = doctorData.paymentData.valueEN
      } else {
        price = doctorData.priceData.valueES
        payment = doctorData.paymentData.valueES
      }
    }
    return (
      <>
        <div
          className={
            specialist ? 'clinic-information specialist' : 'clinic-information'
          }
        >
          <div className="address-label">
            <FormattedMessage id="homepage.outstanding-doctor.address-label" />
          </div>
          <div className="clinic-name">{clinincInfo && clinincInfo.name}</div>
          <div className="clinic-address">
            {clinincInfo && clinincInfo.address}
          </div>
        </div>

        <div className="price-information">
          <p className="price-label">
            <FormattedMessage id="homepage.outstanding-doctor.price" />{' '}
            {this.state.isShowPriceInfo === false && (
              <>
                <span>{price}</span>
                <span
                  className="open-price-info"
                  onClick={() => this.handleOpenPriceInfo()}
                >
                  <FormattedMessage id="homepage.outstanding-doctor.show-detail" />
                </span>
              </>
            )}
          </p>
        </div>

        {this.state.isShowPriceInfo && (
          <div className="price-information-extend">
            <div className="content-up">
              <div className="price-extend">
                <span>
                  <FormattedMessage id="homepage.outstanding-doctor.price" />
                </span>
                <span>{price}</span>
              </div>
              <div className="priority-booking">
                <FormattedMessage id="homepage.outstanding-doctor.priority-booking" />
              </div>
            </div>
            <div className="content-down">
              <FormattedMessage id="homepage.outstanding-doctor.payment" />{' '}
              <span>{payment}</span>
            </div>

            <div
              className="hide-price-info"
              onClick={() => this.handleClosePriceInfo()}
            >
              <FormattedMessage id="homepage.outstanding-doctor.hide-detail" />
            </div>
          </div>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorClinicInfo)
