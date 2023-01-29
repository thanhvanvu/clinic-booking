import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import './HeaderHomePage.scss'

class HeaderHomePage extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i class="fas fa-bars"></i>
              <div className="header-logo"></div>
            </div>

            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>Chuyên Khoa</b>
                </div>
                <div className="sub-title">Tìm bác sĩ theo chuyên khoa</div>
              </div>
              <div className="child-content">
                <div>
                  <b>Cơ sở y tế</b>
                </div>
                <div className="sub-title">Chọn bệnh viện phòng khám</div>
              </div>
              <div className="child-content">
                <div>
                  <b>Bác Sĩ</b>
                </div>
                <div className="sub-title">Chọn bác sĩ giỏi</div>
              </div>
              <div className="child-content">
                <div>
                  <b>Gói khám</b>
                </div>
                <div className="sub-title">Khám sức khỏe tổng quát</div>
              </div>
            </div>

            <div className="right-content">
              <div className="support">
                <i class="fas fa-question-circle"></i>
                Hỗ trợ
              </div>
              <div className="language">VN</div>
            </div>
          </div>
        </div>
        <div className="home-banner">
          <div className="content-up">
            <div className="title-1">NỀN TẢNG Y TẾ</div>
            <div className="title-2">CHĂM SÓC SỨC KHỎE TOÀN DIỆN</div>
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
                  <i class="far fa-hospital"></i>
                </div>
                <div className="option-text">Khám Chuyên Khoa</div>
              </div>
              <div className="option-child">
                <div className="icon">
                  <i class="fas fa-stethoscope"></i>
                </div>
                <div className="option-text">Khám tổng quát</div>
              </div>
              <div className="option-child">
                <div className="icon">
                  <i class="fas fa-heartbeat"></i>
                </div>
                <div className="option-text">Sức Khỏe Tinh Thần</div>
              </div>
              <div className="option-child">
                <div className="icon">
                  <i class="fas fa-vial"></i>
                </div>
                <div className="option-text">Xét Nghiệm Y Học</div>
              </div>
              <div className="option-child">
                <div className="icon">
                  <i class="fas fa-medkit"></i>
                </div>
                <div className="option-text">Khám Nha Khoa</div>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHomePage)
