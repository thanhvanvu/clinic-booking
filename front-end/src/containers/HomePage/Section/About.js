import React, { Component } from 'react'
import { connect } from 'react-redux'
import './About.scss'

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="about-header">Truyền thông nói gì về HealthCare</div>
        <div className="about-content">
          <div className="content-youtube">
            <iframe
              width="650px"
              height="400px"
              src="https://www.youtube.com/embed/jh5U5BnpGN8"
              title="The Future of Healthcare"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About)
