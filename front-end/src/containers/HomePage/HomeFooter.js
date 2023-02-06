import React, { Component } from 'react'
import { connect } from 'react-redux'
import './HomeFooter.scss'
class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <div className="wrapper">
          <p>&copy; 2023 Thanh Vu.</p>
          <a target="/blank" href="https://github.com/vvt4994">
            <i class="fab fa-github"></i>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter)
