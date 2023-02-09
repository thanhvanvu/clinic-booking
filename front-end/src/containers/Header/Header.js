import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LANGUAGES } from '../../utils'
import * as actions from '../../store/actions'
import Navigator from '../../components/Navigator'
import { adminMenu } from './menuApp'
import './Header.scss'
import { changeLanguageApp } from '../../store/actions'

class Header extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language)
  }

  render() {
    const { processLogout, language } = this.props
    console.log(this.props)
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={adminMenu} />
        </div>

        <div className="languages">
          <span
            className={language === LANGUAGES.VI ? 'vi active' : 'vi'}
            onClick={() => this.changeLanguage(LANGUAGES.VI)}
          >
            VN
          </span>
          <span
            className={language === LANGUAGES.EN ? 'en active' : 'en'}
            onClick={() => this.changeLanguage(LANGUAGES.EN)}
          >
            EN
          </span>
          <span
            className={language === LANGUAGES.ES ? 'es active' : 'es'}
            onClick={() => this.changeLanguage(LANGUAGES.ES)}
          >
            ES
          </span>

          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log out"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
        {/* nút logout */}
      </div>
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
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
