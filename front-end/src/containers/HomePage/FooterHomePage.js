import React, { Component } from 'react'
import { connect } from 'react-redux'
import './FooterHomePage.scss'
class FooterHomePage extends Component {
  render() {
    return (
      <div className="home-footer">
        <div className="wrapper">
          <p>&copy; 2023 Thanh Vu.</p>
          <a target="/blank" href="https://github.com/vvt4994">
            <i className="fab fa-github"></i>
          </a>
        </div>
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
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterHomePage)
