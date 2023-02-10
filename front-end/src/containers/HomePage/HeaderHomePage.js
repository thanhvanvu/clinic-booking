import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import './HeaderHomePage.scss'
import { FormattedMessage } from 'react-intl'
import { LANGUAGES } from '../../utils/constant'
import { changeLanguageApp } from '../../store/actions/appActions'

class HeaderHomePage extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language)
  }
  render() {
    // get language from redux
    let language = this.props.language
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars"></i>
              <div className="header-logo"></div>
            </div>

            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.specialist" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.search-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.health-facility" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.select-hospital" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.doctor" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.select-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.health-package" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="home-header.general-examination" />
                </div>
              </div>
            </div>

            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle question"></i>
                <FormattedMessage id="home-header.support" />
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? 'language-vi active'
                    : 'language-vi'
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? 'language-en active'
                    : 'language-en'
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.ES
                    ? 'language-es active'
                    : 'language-es'
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.ES)}>
                  ES
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="home-banner">
          <div className="content-up">
            <div className="title-1">
              <FormattedMessage id="home-banner.med-foundation" />
            </div>
            <div className="title-2">
              <FormattedMessage id="home-banner.comp-health-care" />
            </div>
            <div className="search">
              <i className="fas fa-search search-icon"></i>
              <input type="text" placeholder="Tìm kiếm" />
              <i className="fas fa-times delete-icon"></i>
            </div>
            <div className="option"></div>
          </div>
          <div className="content-down">
            <div className="options">
              <div className="option-child">
                <div className="icon">
                  <i className="far fa-hospital"></i>
                </div>
                <div className="option-text">
                  <FormattedMessage id="home-banner.specialist-exam" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon">
                  <i className="fas fa-stethoscope"></i>
                </div>
                <div className="option-text">
                  <FormattedMessage id="home-banner.physical-exam" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon">
                  <i className="fas fa-heartbeat"></i>
                </div>
                <div className="option-text">
                  <FormattedMessage id="home-banner.mental-health" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon">
                  <i className="fas fa-vial"></i>
                </div>
                <div className="option-text">
                  <FormattedMessage id="home-banner.medical-test" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon">
                  <i className="fas fa-medkit"></i>
                </div>
                <div className="option-text">
                  <FormattedMessage id="home-banner.dental-exam" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHomePage)
