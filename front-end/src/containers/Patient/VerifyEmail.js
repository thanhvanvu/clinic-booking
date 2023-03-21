import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { handleVerifyBookingAppointment } from '../../services/userService'
import HeaderHomePage from '../HomePage/HeaderHomePage'
import './VerifyEmail.scss'
class VerifyEmail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isConfirmed: false,
      errCode: 0,
    }
  }

  async componentDidMount() {
    const token = new URLSearchParams(this.props.location.search).get('token')
    const doctorId = new URLSearchParams(this.props.location.search).get(
      'doctorId'
    )

    let response = await handleVerifyBookingAppointment(token, doctorId)

    if (response && response.errCode === 0) {
      this.setState({
        isConfirmed: true,
        errCode: response.errCode,
      })
    } else {
      this.setState({
        isConfirmed: true,
        errCode: response && response.errCode ? response.errCode : -1,
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return (
      <>
        <HeaderHomePage />
        <div className="confirmation-page">
          {this.state.isConfirmed === false ? (
            <div class="loader"></div>
          ) : (
            <div className="confirm-content">
              {this.state.errCode === 0 ? (
                <h1>Thank you for confirming the appointment !</h1>
              ) : (
                <h1>
                  Your appointment has been confirmed! Please close this page.
                </h1>
              )}
            </div>
          )}
        </div>
      </>
    )
  }
}
{
  /* 
<h1>
                Your appointment has been confirmed! Please close this page.
              </h1> */
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail)
