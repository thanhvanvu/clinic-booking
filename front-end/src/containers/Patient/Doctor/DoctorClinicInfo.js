import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './DoctorClinicInfo.scss'
import { LANGUAGES } from '../../../utils'
import { getDetailDoctorById } from '../../../services/userService'
class DoctorClinicInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      doctorClinicInfo: '',
      isShowPriceInfo: false,
    }
  }

  async componentDidMount() {
    if (this.props.doctorId) {
      let doctorId = this.props.doctorId
      let response = await getDetailDoctorById(doctorId)
      if (response && response.errCode === 0) {
        let doctorData = response.data
        if (doctorData && doctorData.DoctorInfo) {
          let clinicInfo = doctorData.DoctorInfo
          this.setState({
            doctorClinicInfo: clinicInfo,
          })
        }
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctorId !== this.props.doctorId) {
      let doctorId = this.props.doctorId
      let response = await getDetailDoctorById(doctorId)
      if (response && response.errCode === 0) {
        let doctorData = response.data
        if (doctorData && doctorData.DoctorInfo) {
          let clinicInfo = doctorData.DoctorInfo
          this.setState({
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
    let language = this.props.language
    let specialist = this.props.specialist
    let price = ''
    let payment = ''
    if (clinincInfo && clinincInfo.priceData) {
      if (language === LANGUAGES.VI) {
        price = clinincInfo.priceData.valueVI
        payment = clinincInfo.paymentData.valueVI
      } else if (language === LANGUAGES.EN) {
        price = clinincInfo.priceData.valueEN
        payment = clinincInfo.paymentData.valueEN
      } else {
        price = clinincInfo.priceData.valueES
        payment = clinincInfo.paymentData.valueES
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
          <div className="clinic-name">
            {clinincInfo && clinincInfo.nameClinic}
          </div>
          <div className="clinic-address">
            {clinincInfo && clinincInfo.addressClinic}
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
