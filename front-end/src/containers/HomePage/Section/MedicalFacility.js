import React, { Component } from 'react'
import { connect } from 'react-redux'
import './MedicalFacility.scss'
import '../HomePage.scss'
import Slider from 'react-slick'

class MedicalFacility extends Component {
  render() {
    let settings = this.props.settings
    return (
      <div className="section-share section-medical-facility">
        <div className="section-content">
          <div className="section-header">
            <span className="header-text">Cơ sở y tế nổi bật</span>
            <button className="btn-more">XEM THÊM</button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
              <div className="image-custom">
                <div className="bg-img medical-facility"></div>

                <div className="img-text">Bệnh Viện Chợ Rẫy 1</div>
              </div>
              <div className="image-custom">
                <div className="bg-img medical-facility"></div>

                <div className="img-text">Bệnh Viện Chợ Rẫy 1</div>
              </div>
              <div className="image-custom">
                <div className="bg-img medical-facility"></div>

                <div className="img-text">Bệnh Viện Chợ Rẫy 1</div>
              </div>
              <div className="image-custom">
                <div className="bg-img medical-facility"></div>

                <div className="img-text">Bệnh Viện Chợ Rẫy 1</div>
              </div>
              <div className="image-custom">
                <div className="bg-img medical-facility"></div>

                <div className="img-text">Bệnh Viện Chợ Rẫy 1</div>
              </div>
              <div className="image-custom">
                <div className="bg-img medical-facility"></div>

                <div className="img-text">Bệnh Viện Chợ Rẫy 1</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
