import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './UserRedux.scss'
import { handleGetAllCode } from '../../services/userService'
import { LANGUAGES } from '../../utils'

import * as actions from '../../store/actions'

class UserRedux extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
    }
  }

  async componentDidMount() {
    // render gender, positions, roles with normal way
    // try {
    //   const response = await handleGetAllCode('all')
    //   console.log(response)
    //   const tempGenderState = []
    //   const tempRoleState = []
    //   const tempPositionState = []
    //   if (response.errCode === 0) {
    //     const allCode = response.type
    //     allCode.forEach((item) => {
    //       if (item.type === 'ROLE') {
    //         tempRoleState.push(item)
    //       }
    //       if (item.type === 'POSITION') {
    //         tempPositionState.push(item)
    //       }
    //       if (item.type === 'GENDER') {
    //         tempGenderState.push(item)
    //       }
    //       this.setState({
    //         genderArr: tempGenderState,
    //         positionArr: tempPositionState,
    //         roleArr: tempRoleState,
    //       })
    //     })
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
    // render with Redux
    this.props.getGenderStart()
    // this.props.getPositionStart()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // the past: prev
    // the present: this
    // compare prev(empty[]) with this ( array [...] after using Redux)
    // if prev !== this ==> setState
    if (prevProps.genders !== this.props.genders) {
      this.setState({
        genderArr: this.props.genders,
      })
    }
    // after setState, compare prev(array[...]) with this (array[...])
    // prev === this ==> do nothing
  }

  render() {
    const { currentLanguage } = this.props
    console.log(this.props)

    let genders = this.state.genderArr
    let positions = this.state.positionArr
    let roles = this.state.roleArr

    return (
      <div className="user-redux-container">
        <div className="title">
          <FormattedMessage id="manage-user-redux.header" />
        </div>
        <div className="user-redux-body mt-4">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <label>
                  <FormattedMessage id="manage-user-redux.email" />
                </label>
                <input className="form-control" type="email" />
              </div>
              <div className="col-6">
                <label>
                  <FormattedMessage id="manage-user-redux.password" />
                </label>
                <input className="form-control" type="password" />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-user-redux.first-name" />
                </label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-user-redux.last-name" />
                </label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-4">
                <label>
                  <FormattedMessage id="manage-user-redux.phone" />
                </label>
                <input className="form-control" type="text" />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <label>
                  <FormattedMessage id="manage-user-redux.address" />
                </label>
                <input className="form-control" type="text" />
              </div>
            </div>
            <div className="row mt-3">
              <div className="form-group col-3">
                <label>
                  <FormattedMessage id="manage-user-redux.gender" />
                </label>
                <select className="form-control">
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index}>
                          {currentLanguage === LANGUAGES.VI
                            ? item.valueVI
                            : currentLanguage === LANGUAGES.EN
                            ? item.valueEN
                            : item.valueES}
                        </option>
                      )
                    })}
                </select>
              </div>
              <div className="form-group col-3">
                <label>
                  <FormattedMessage id="manage-user-redux.position" />
                </label>
                <select className="form-control">
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index}>
                          {currentLanguage === LANGUAGES.VI
                            ? item.valueVI
                            : currentLanguage === LANGUAGES.EN
                            ? item.valueEN
                            : item.valueES}
                        </option>
                      )
                    })}
                </select>
              </div>
              <div className="form-group col-3">
                <label>
                  <FormattedMessage id="manage-user-redux.role" />
                </label>
                <select className="form-control">
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index}>
                          {currentLanguage === LANGUAGES.VI
                            ? item.valueVI
                            : currentLanguage === LANGUAGES.EN
                            ? item.valueEN
                            : item.valueES}
                        </option>
                      )
                    })}
                </select>
              </div>
              <div className="form-group col-3">
                <label>
                  <FormattedMessage id="manage-user-redux.image" />
                </label>
                <input className="form-control" type="text" />
              </div>
            </div>
            <button className="btn btn-primary mt-3">
              <FormattedMessage id="manage-user-redux.save" />
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentLanguage: state.app.language,
    genders: state.admin.genders,
    positions: state.admin.position,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    // getPositionStart: () => dispatch(actions.fetchPositionStart()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux)
