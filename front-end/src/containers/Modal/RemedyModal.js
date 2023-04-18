import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './RemedyModal.scss'
import { Modal } from 'reactstrap'
import { CommonUtils } from '../../utils'

class RemedyModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      patientEmail: '',
      remedyFileImg: null,
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.patientEmail !== this.props.patientEmail) {
      this.setState({
        patientEmail: this.props.patientEmail,
      })
    }
  }

  handleRemedyFile = async (event) => {
    let imgBase64 = await CommonUtils.getBase64(event.target.files[0])
    this.setState({
      remedyFileImg: imgBase64,
    })
  }

  handleSendRemedy = () => {
    this.props.handleSendRemedy(this.state)
  }

  render() {
    let { isOpen, handleCloseRemedyModal } = this.props
    return (
      <Modal className="remedy-modal" centered isOpen={isOpen}>
        <div className="remedy-modal-wrapper">
          <div className="remedy-modal-header col-12">
            Gửi hóa đơn khám bệnh
          </div>
          <div className="remedy-modal-body">
            <div className="patient-email col-6">
              <label className="content-label">Email bệnh nhân</label>
              <input
                type="email"
                className="form-control"
                value={this.state.patientEmail}
                placeholder="email"
                onChange={(event) =>
                  this.setState({
                    patientEmail: event.target.value,
                  })
                }
              />
            </div>
            <div className="remedy-upload col-6">
              <label className="content-label">Chọn file đơn thuốc</label>
              <input
                type="file"
                className=""
                onChange={(event) => this.handleRemedyFile(event)}
              />
            </div>
          </div>

          <div className="remedy-modal-footer col-12">
            <div className="footer-button">
              <button
                className="remedy-send"
                onClick={() => this.handleSendRemedy()}
              >
                Gui
              </button>
              <button className="modal-cancel" onClick={handleCloseRemedyModal}>
                cancel
              </button>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal)
