import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './UserRedux.scss'
import { handleGetAllCode } from '../../services/userService'
import { LANGUAGES } from '../../utils'
import NoneAvatar from '../../assets/avatar-none.png'

import * as actions from '../../store/actions'

import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css' // This only needs to be imported once in your app

class UserRedux extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImg: '',
      isPreviewImgOpen: false,
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
    this.props.getPositionStart()
    this.props.getRoleStart()
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

    if (prevProps.positions !== this.props.positions) {
      this.setState({
        positionArr: this.props.positions,
      })
    }

    if (prevProps.roles !== this.props.roles) {
      this.setState({
        roleArr: this.props.roles,
      })
    }
  }

  handleOnchangeImage = (event) => {
    let data = event.target.files
    let file = data[0]
    let fileType = file.type.slice(0, 5)
    if (file && fileType === 'image') {
      let objectUrl = URL.createObjectURL(file)
      this.setState({ previewImg: objectUrl })
    }
  }

  openPreviewImg = () => {
    if (this.state.previewImg) {
      this.setState({ isPreviewImgOpen: true })
    }
  }

  render() {
    const { currentLanguage, isLoading } = this.props
    let genders = this.state.genderArr
    let positions = this.state.positionArr
    let roles = this.state.roleArr

    return (
      <div className="user-redux-container">
        <div className="title">
          <FormattedMessage id="manage-user-redux.header" />
        </div>
        <div className="text-center">
          <div className={isLoading ? ' loader' : ''}></div>
        </div>
        <div className="user-redux-body mt-4">
          <div className="container">
            <div className="preview-img">
              <img
                src={this.state.previewImg ? this.state.previewImg : NoneAvatar}
                alt=""
                width="100"
                height="100"
                onClick={() => this.openPreviewImg()}
              />
            </div>

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
                <div>
                  <input
                    id="img-upload"
                    className=""
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnchangeImage(event)}
                  />
                  <label id="img-upload" htmlFor="img-upload">
                    <i className="fas fa-upload img-upload"></i>
                    Tải ảnh
                  </label>
                </div>
              </div>
            </div>
            <button className="btn btn-primary mt-3">
              <FormattedMessage id="manage-user-redux.save" />
            </button>
          </div>
        </div>
        {this.state.isPreviewImgOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImg}
            onCloseRequest={() => this.setState({ isPreviewImgOpen: false })}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentLanguage: state.app.language,
    genders: state.admin.genders,
    positions: state.admin.positions,
    roles: state.admin.roles,
    isLoading: state.admin.isLoading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux)
