import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Specialist.scss'
import Slider from 'react-slick'

class Specialist extends Component {
  render() {
    let settings = this.props.settings
    return (
      <div className="section-share section-specialist">
        <div className="section-content">
          <div className="section-header">
            <span className="header-text">Chuyên Khoa Phổ Biến</span>
            <button className="btn-more">XEM THÊM</button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
              <div className="image-custom">
                <div className="bg-img specialist"></div>

                <div className="img-text">Cơ Xương Khớp 1</div>
              </div>
              <div className="image-custom">
                <div className="bg-img specialist"></div>

                <div className="img-text">Cơ Xương Khớp 2</div>
              </div>
              <div className="image-custom">
                <div className="bg-img specialist"></div>

                <div className="img-text">Cơ Xương Khớp 3</div>
              </div>
              <div className="image-custom">
                <div className="bg-img specialist"></div>

                <div className="img-text">Cơ Xương Khớp 4</div>
              </div>
              <div className="image-custom">
                <div className="bg-img specialist"></div>

                <div className="img-text">Cơ Xương Khớp 5</div>
              </div>
              <div className="image-custom">
                <div className="bg-img specialist"></div>

                <div className="img-text">Cơ Xương Khớp 6</div>
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
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Specialist)
