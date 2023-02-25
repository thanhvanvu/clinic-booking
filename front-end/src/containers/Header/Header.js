import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LANGUAGES, USER_ROLE } from '../../utils'
import * as actions from '../../store/actions'
import Navigator from '../../components/Navigator'
import { adminMenu, doctorMenu } from './menuApp'
import './Header.scss'
import { changeLanguageApp } from '../../store/actions'
import { FormattedMessage } from 'react-intl'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuApp: [],
    }
  }
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language)
  }
  componentDidMount() {
    let userInfo = this.props.userInfo
    let menu = []
    if (userInfo) {
      let role = userInfo.roleId

      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu
      }

      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu
      }
    }

    this.setState({
      menuApp: menu,
    })
  }

  processLogout = () => {
    if (window.confirm('Are you sure to log out?')) {
      this.props.processLogout()
    }
  }

  render() {
    // get states from redux
    const { language, userInfo } = this.props
    console.log(this.state.menuApp)
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>

        <div className="right-header-content">
          <p className="welcome">
            <FormattedMessage id="menu.system.welcome" />
            {userInfo && userInfo.firstName ? userInfo.firstName : ''}!
          </p>

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
            onClick={() => this.processLogout()}
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
    userInfo: state.user.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
