import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import './SpecialistListView.scss'
import { connect } from 'react-redux'
import HeaderHomePage from '../../HomePage/HeaderHomePage'
import FooterHomePage from '../../HomePage/FooterHomePage'
import { handleGetAllSpecialist } from '../../../services/specialistService'
import { CommonUtils } from '../../../utils'
class SpecialistListView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      specialistArr: [],
    }
  }

  async componentDidMount() {
    // call API to get all specialist
    let response = await handleGetAllSpecialist()
    if (response && response.errCode === 0) {
      let specialistArr = response.data
      specialistArr.map((specialist, index) => {
        specialist.image = CommonUtils.convertBufferToBase64(specialist.image)
        return specialist
      })
      this.setState({
        specialistArr: specialistArr,
      })
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleViewSpecialist = (specialist) => {
    const { history } = this.props
    history.push(`/detail-specialist/${specialist.id}`)
  }

  render() {
    let specialistArr = this.state.specialistArr
    return (
      <>
        <HeaderHomePage />
        <div className="container-list-view-specialist wrapper">
          {specialistArr &&
            specialistArr.length > 0 &&
            specialistArr.map((specialist, index) => {
              return (
                <div className="specialist-detail" key={index}>
                  <img
                    className="specialist-image"
                    src={specialist.image}
                    alt=""
                    onClick={() => this.handleViewSpecialist(specialist)}
                  />
                  <p>{specialist.tittle}</p>
                </div>
              )
            })}
        </div>
        <FooterHomePage />
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialistListView)
