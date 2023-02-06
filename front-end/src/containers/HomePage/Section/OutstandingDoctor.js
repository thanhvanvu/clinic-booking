import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../HomePage.scss'
import Slider from 'react-slick'
import './OutstandingDoctor.scss'

class OutstandingDoctor extends Component {
  render() {
    let settings = this.props.settings
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-content">
          <div className="section-header">
            <span className="header-text">Bác sĩ nổi bật tuần qua</span>
            <button className="btn-more">XEM THÊM</button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
              <div className="image-custom outstanding-doctor">
                <div className="outer-background">
                  <div className="bg-img outstanding-doctor"></div>
                </div>
                <div className="positon">
                  <div className="doctor-name">Giáo sư, Tiến Sĩ Thành Vũ</div>
                  <div className="doctor-position">Cơ xương khớp</div>
                </div>
              </div>
              <div className="image-custom outstanding-doctor">
                <div className="outer-background">
                  <div className="bg-img outstanding-doctor"></div>
                </div>
                <div className="positon">
                  <div className="doctor-name">Giáo sư, Tiến Sĩ Thành Vũ</div>
                  <div className="doctor-position">Cơ xương khớp</div>
                </div>
              </div>
              <div className="image-custom outstanding-doctor">
                <div className="outer-background">
                  <div className="bg-img outstanding-doctor"></div>
                </div>
                <div className="positon">
                  <div className="doctor-name">Giáo sư, Tiến Sĩ Thành Vũ</div>
                  <div className="doctor-position">Cơ xương khớp</div>
                </div>
              </div>
              <div className="image-custom outstanding-doctor">
                <div className="outer-background">
                  <div className="bg-img outstanding-doctor"></div>
                </div>
                <div className="positon">
                  <div className="doctor-name">Giáo sư, Tiến Sĩ Thành Vũ</div>
                  <div className="doctor-position">Cơ xương khớp</div>
                </div>
              </div>
              <div className="image-custom outstanding-doctor">
                <div className="outer-background">
                  <div className="bg-img outstanding-doctor"></div>
                </div>
                <div className="positon">
                  <div className="doctor-name">Giáo sư, Tiến Sĩ Thành Vũ</div>
                  <div className="doctor-position">Cơ xương khớp</div>
                </div>
              </div>
              <div className="image-custom outstanding-doctor">
                <div className="outer-background">
                  <div className="bg-img outstanding-doctor"></div>
                </div>
                <div className="positon">
                  <div className="doctor-name">Giáo sư, Tiến Sĩ Thành Vũ</div>
                  <div className="doctor-position">Cơ xương khớp</div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)
