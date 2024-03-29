import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './Specialist.scss'
import Slider from 'react-slick'
import { handleGetAllSpecialist } from '../../../services/specialistService'
import { CommonUtils } from '../../../utils'
import { withRouter } from 'react-router'
import ListSpinner from '../../../components/ListSpinner'

class Specialist extends Component {
  constructor(props) {
    super(props)
    this.state = {
      specialistArr: [],
      isLoading: false,
    }
  }
  async componentDidMount() {
    this.setState({
      isLoading: true,
    })
    // call API to get all specialist
    let response = await handleGetAllSpecialist()
    if (response && response.errCode === 0) {
      this.setState({
        specialistArr: response.data,
        isLoading: false,
      })
    }
  }
  componentDidUpdate() {}

  handleViewSpecialist = (specialist) => {
    const { history } = this.props
    history.push(`/detail-specialist/${specialist.id}`)
  }

  handleListViewSpecialist = () => {
    const { history } = this.props
    history.push(`/list-specialist`)
  }

  render() {
    let specialistArr = this.state.specialistArr
    let settings = this.props.settings
    let isLoading = this.state.isLoading
    return (
      <div className="section-share section-specialist">
        <div className="section-content">
          <div className="section-header">
            <span className="header-text">
              <FormattedMessage id="homepage.specialist.homepage-tittle" />
            </span>
            <button
              className="btn-more"
              onClick={() => this.handleListViewSpecialist()}
            >
              <FormattedMessage id="homepage.read-more" />
            </button>
          </div>
          <div className="section-body">
            {isLoading && <ListSpinner />}

            <Slider {...settings}>
              {specialistArr &&
                specialistArr.length > 0 &&
                specialistArr.map((specialist, index) => (
                  <div
                    className="image-custom specialist"
                    key={index}
                    onClick={() => this.handleViewSpecialist(specialist)}
                  >
                    <img
                      className="bg-img"
                      alt=""
                      src={CommonUtils.convertBufferToBase64(specialist.image)}
                    />
                    <div className="img-text">{specialist.tittle}</div>
                  </div>
                ))}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialist)
)
