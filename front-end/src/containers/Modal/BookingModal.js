import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './BookingModal.scss'
import { Modal } from 'reactstrap'
import ProfileDoctor from '../Patient/Doctor/ProfileDoctor'
class DefaultClass extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  toggle() {
    this.setState({
      isModal: false,
    })
  }

  render() {
    let { isModalBooking, closeBookingModal, selectedScheduleHour } = this.props

    // get doctorId from component parent
    let doctorId = ''
    if (selectedScheduleHour) {
      doctorId = selectedScheduleHour.doctorId
    }
    return (
      <Modal
        isOpen={isModalBooking}
        className="booking-modal"
        size="lg"
        centered
      >
        <div className="booking-modal-content">
          <div className="booking-modal-header">
            <ProfileDoctor doctorId={doctorId} />
          </div>
          <div className="booking-modal-body">
            <div className="row">
              <div className=" booking-body-content price-booking">
                <span>Gia kham</span>
                <span className="price">500$</span>
              </div>
              <div className="col-11 booking-body-content">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  className="col-12 "
                  placeholder="Patient first and last name (required)"
                />
              </div>
              <div className="col-12 fullname-note">
                Hãy ghi rõ Họ Và Tên, viết hoa những chữ cái đầu tiên, ví dụ:
                Trần Văn Phú
              </div>
              <div className="col-11 booking-body-content gender">
                <input type="radio" id="male" value="" name="gender" />
                <label for="male">Nam</label>
                <input type="radio" id="female" value="" name="gender" />
                <label for="female">Nu</label>
                <input type="radio" value="" id="other" name="gender" />
                <label for="other">Khac</label>
              </div>
              <div className="col-11 booking-body-content">
                <i className="fas fa-phone"></i>
                <input
                  type="number"
                  className="col-12"
                  placeholder="Phone number (required)"
                />
              </div>
              <div className="col-11 booking-body-content">
                <i className="fas fa-calendar-alt"></i>
                <input
                  className="col-12"
                  placeholder="Year of birth (required)"
                />
              </div>

              <div className="col-11 booking-body-content">
                <i className="fas fa-map-marker-alt"></i>
                <input className="col-12" placeholder="Address" />
              </div>
              <div className="col-11 booking-body-content exam-note">
                <i className="fas fa-file-medical"></i>
                <textarea
                  className="col-12"
                  name=""
                  id=""
                  cols="30"
                  rows="3"
                  placeholder="Lý do khám"
                ></textarea>
              </div>
              <div className="col-11 booking-body-content total-price">
                <div className="initial-price">
                  <span>giá khám</span>
                  <span>300d</span>
                </div>
                <div className="booking-fee">
                  <span>phí đặt lịch</span>
                  <span>miễn phí</span>
                </div>
                <div className="total">
                  <span>Tổng cộng</span>
                  <span>300d</span>
                </div>
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <button className="confirm-booking">Xac Nhan</button>
            <button className="cancel-booking" onClick={closeBookingModal}>
              Huy
            </button>
          </div>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass)
