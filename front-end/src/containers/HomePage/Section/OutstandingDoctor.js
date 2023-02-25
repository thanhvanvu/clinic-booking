import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../HomePage.scss'
import Slider from 'react-slick'
import './OutstandingDoctor.scss'
import * as actions from '../../../store/actions'
import { CommonUtils } from '../../../utils'
import { LANGUAGES } from '../../../utils'
import { FormattedMessage } from 'react-intl'
import { withRouter } from 'react-router'
class OutstandingDoctor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topDoctorArr: [],
    }
  }
  componentDidMount() {
    this.props.fetchTopDoctors()
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({ topDoctorArr: this.props.topDoctors })
    }
  }

  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`)
  }
  render() {
    let settings = this.props.settings
    let topDoctorArr = this.state.topDoctorArr
    let language = this.props.language
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-content">
          <div className="section-header">
            <span className="header-text">
              <FormattedMessage id="homepage.outstanding-doctor" />
            </span>
            <button className="btn-more">
              <FormattedMessage id="homepage.read-more" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
              {topDoctorArr &&
                topDoctorArr.length > 0 &&
                topDoctorArr.map((doctor, index) => (
                  <div
                    className="image-custom outstanding-doctor"
                    key={index}
                    onClick={() => this.handleViewDetailDoctor(doctor)}
                  >
                    <div className="outer-background">
                      <div className="bg-img outstanding-doctor">
                        <img
                          src={CommonUtils.convertBufferToBase64(
                            doctor.image.data
                          )}
                          alt=""
                          width="150"
                          height="150"
                        />
                      </div>
                    </div>
                    <div className="positon">
                      <div className="doctor-name">
                        {language === LANGUAGES.EN
                          ? doctor.positionData.valueEN
                          : language === LANGUAGES.ES
                          ? doctor.positionData.valueES
                          : doctor.positionData.valueVI}
                        {', '}
                        {doctor.firstName + ' ' + doctor.lastName}
                      </div>
                      <div className="doctor-position">Specialist</div>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    topDoctors: state.homepage.topDoctors,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTopDoctors: () => dispatch(actions.fetchTopDoctors()),
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)
)
