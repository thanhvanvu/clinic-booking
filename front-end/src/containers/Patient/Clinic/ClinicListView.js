import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import './ClinicListView.scss'
import { connect } from 'react-redux'
import HeaderHomePage from '../../HomePage/HeaderHomePage'
import FooterHomePage from '../../HomePage/FooterHomePage'
import { CommonUtils } from '../../../utils'
class ClinicListView extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return (
      <>
        <HeaderHomePage />
        <div className="container-list-view-clinic wrapper">
          <div className="clinic-detail">
            <img className="clinic-image" src="" alt="" />
            <p>abc</p>
          </div>

          <div className="clinic-detail">
            <img className="clinic-image" src="" alt="" />
            <p>abc</p>
          </div>
          <div className="clinic-detail">
            <img className="clinic-image" src="" alt="" />
            <p>abc</p>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ClinicListView)
