import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './UserRedux.scss'
import { LANGUAGES, CommonUtils } from '../../../utils'
import noneAvatar from '../../../assets/images/avatar-none.png'
import * as actions from '../../../store/actions'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css' // This only needs to be imported once in your app
import TableViewUser from './TableViewUser'
import { CRUD_ACTIONS } from '../../../utils'

class UserRedux extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImg: '',
      isPreviewImgOpen: false,
      createUserErrorMessage: [],
      userData: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        gender: '',
        roleId: '',
        positionId: '',
        image: '',
      },
      action: '',
      inputValid: '',
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
      let arrGenders = this.props.genders
      this.setState({
        genderArr: arrGenders,

        // set defaut value for dropdown select menu
        userData: {
          ...this.state.userData,
          gender:
            arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
        },
      })
    }
    // after setState, compare prev(array[...]) with this (array[...])
    // prev === this ==> do nothing

    if (prevProps.positions !== this.props.positions) {
      let arrPositions = this.props.positions
      this.setState({
        positionArr: this.props.positions,

        // set defaut value for dropdown select menu
        userData: {
          ...this.state.userData,
          positionId:
            arrPositions && arrPositions.length > 0
              ? arrPositions[0].keyMap
              : '',
        },
      })
    }

    if (prevProps.roles !== this.props.roles) {
      let arrRoles = this.props.roles
      this.setState({
        roleArr: arrRoles,

        // set defaut value for dropdown select menu
        userData: {
          ...this.state.userData,
          roleId: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
        },
      })
    }

    // check if list users change after creating a new user
    // ==> set empty form
    if (prevProps.users !== this.props.users) {
      this.setState({
        ...this.state,
        action: CRUD_ACTIONS.CREATE,
        previewImg: '',
        userData: {
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          address: '',
          phoneNumber: '',
          gender: '',
          roleId: '',
          positionId: '',
          image: '',
        },
      })
    } else {
    }
  }

  handleOnchangeImage = async (event) => {
    let data = event.target.files
    let file = data[0]
    let fileType = file.type.slice(0, 5)
    if (file && fileType === 'image') {
      let base64 = await CommonUtils.getBase64(file)
      let objectUrl = URL.createObjectURL(file)

      this.setState({
        previewImg: objectUrl,
        userData: {
          ...this.state.userData,
          image: base64,
        },
      })
    }
  }

  openPreviewImg = () => {
    if (this.state.previewImg) {
      this.setState({ isPreviewImgOpen: true })
    }
  }

  handleOnchangeInput = (event) => {
    this.setState({
      userData: {
        ...this.state.userData,
        [event.target.name]: event.target.value,
      },
    })
  }

  checkValidateInput = () => {
    this.setState({ inputValid: '' })
    let userData = this.state.userData
    let returnObj = {}
    let isvalid = true
    Object.entries(userData).forEach((entry) => {
      const [key, value] = entry

      if (key === 'image') {
        // do nothing
      } else if (value === '') {
        isvalid = false
        returnObj[key] = false
      } else {
        returnObj[key] = true
      }
    })

    this.setState({ inputValid: returnObj })

    if (isvalid === true) {
      return true
    } else {
      return false
    }
  }

  handleUser = async () => {
    if (this.state.action === CRUD_ACTIONS.UPDATE) {
      const userData = this.state.userData
      const isValid = this.checkValidateInput()
      console.log(userData)
      if (isValid === false) {
        return
      } else {
        // fire redux action, need to wait this function to be done first
        await this.props.updateUserStart(userData)

        // call fetch user function to update table
        this.props.fetchAllUsers()
      }
    } else {
      const isValid = this.checkValidateInput()
      if (isValid === false) {
        return
      } else {
        // fire redux action, need to wait this function to be done first
        await this.props.createNewUser(this.state.userData)

        // set state error if create user fail
        this.setState({
          createUserErrorMessage: this.props.createUserErrorMessage,
        })

        // check if any fail in redux. Yes => return
        if (this.props.createUserErrorMessage) {
          return
        } else {
          // call fetch user function to update table
          this.props.fetchAllUsers()
        }

        return
      }
    }
  }

  handleEditUserFromParent = async (user) => {
    // user is data from child component
    // set state with data from child

    // handle image type buffer
    let imageBase64 = ''
    if (user.image.data.length === 0) {
      this.setState({
        previewImg: '',
      })
    } else {
      // const imageBuffer = Buffer.from(user.image, 'base64')
      // imageBase64 = imageBuffer.toString()
      imageBase64 = CommonUtils.convertBufferToBase64(user.image)
    }

    this.setState(
      {
        previewImg: imageBase64,
        action: CRUD_ACTIONS.UPDATE,
        userData: {
          id: user.id,
          email: user.email,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          phoneNumber: user.phoneNumber,
          gender: user.gender,
          roleId: user.roleId,
          positionId: user.positionId,
          image: imageBase64,
        },
      },
      () => {}
    )
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
                src={this.state.previewImg ? this.state.previewImg : noneAvatar}
                alt=""
                width="100"
                height="100"
                onClick={() => this.openPreviewImg()}
              />
            </div>

            <div className="error">{this.state.createUserErrorMessage}</div>

            <div className="row">
              <div
                className={
                  this.state.action === CRUD_ACTIONS.UPDATE ? 'col-12' : 'col-6'
                }
              >
                <div style={{ display: 'flex' }}>
                  <label>
                    <FormattedMessage id="manage-user-redux.email" />
                  </label>
                </div>

                <input
                  className={
                    this.state.inputValid.email === false
                      ? 'form-control invalid'
                      : 'form-control '
                  }
                  type="email"
                  name="email"
                  value={this.state.userData.email}
                  onChange={(event) => this.handleOnchangeInput(event)}
                  disabled={this.state.action === CRUD_ACTIONS.UPDATE}
                />
              </div>
              {this.state.action !== CRUD_ACTIONS.UPDATE && (
                <div className="col-6">
                  <div style={{ display: 'flex' }}>
                    <label>
                      <FormattedMessage id="manage-user-redux.password" />
                    </label>
                  </div>
                  <input
                    className={
                      this.state.inputValid.password === false
                        ? 'form-control invalid'
                        : 'form-control '
                    }
                    type="password"
                    name="password"
                    value={this.state.userData.password}
                    onChange={(event) => this.handleOnchangeInput(event)}
                  />
                </div>
              )}
            </div>
            <div className="row mt-3">
              <div className="col-4">
                <div style={{ display: 'flex' }}>
                  <label>
                    <FormattedMessage id="manage-user-redux.first-name" />
                  </label>
                </div>
                <input
                  className={
                    this.state.inputValid.firstName === false
                      ? 'form-control invalid'
                      : 'form-control '
                  }
                  type="text"
                  name="firstName"
                  value={this.state.userData.firstName}
                  onChange={(event) => this.handleOnchangeInput(event)}
                />
              </div>
              <div className="col-4">
                <div style={{ display: 'flex' }}>
                  <label>
                    <FormattedMessage id="manage-user-redux.last-name" />
                  </label>
                </div>
                <input
                  className={
                    this.state.inputValid.lastName === false
                      ? 'form-control invalid'
                      : 'form-control '
                  }
                  type="text"
                  name="lastName"
                  value={this.state.userData.lastName}
                  onChange={(event) => this.handleOnchangeInput(event)}
                />
              </div>
              <div className="col-4">
                <div style={{ display: 'flex' }}>
                  <label>
                    <FormattedMessage id="manage-user-redux.phone" />
                  </label>
                </div>
                <input
                  className={
                    this.state.inputValid.phoneNumber === false
                      ? 'form-control invalid'
                      : 'form-control '
                  }
                  type="text"
                  name="phoneNumber"
                  value={this.state.userData.phoneNumber}
                  onChange={(event) => this.handleOnchangeInput(event)}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <div style={{ display: 'flex' }}>
                  <label>
                    <FormattedMessage id="manage-user-redux.address" />
                  </label>
                </div>
                <input
                  className={
                    this.state.inputValid.address === false
                      ? 'form-control invalid'
                      : 'form-control '
                  }
                  type="text"
                  name="address"
                  value={this.state.userData.address}
                  onChange={(event) => this.handleOnchangeInput(event)}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="form-group col-3">
                <label>
                  <FormattedMessage id="manage-user-redux.gender" />
                </label>
                <select
                  className="form-control"
                  name="gender"
                  value={this.state.userData.gender}
                  onChange={(event) => this.handleOnchangeInput(event)}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
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
                <select
                  className="form-control"
                  name="positionId"
                  value={this.state.userData.positionId}
                  onChange={(event) => this.handleOnchangeInput(event)}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
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
                <select
                  className="form-control"
                  name="roleId"
                  value={this.state.userData.roleId}
                  onChange={(event) => this.handleOnchangeInput(event)}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
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
                    name="image"
                    onChange={(event) => {
                      this.handleOnchangeImage(event)
                    }}
                  />
                  <label id="img-upload" htmlFor="img-upload">
                    <i className="fas fa-upload img-upload"></i>
                    <FormattedMessage id="manage-user-redux.upload" />
                  </label>
                </div>
              </div>
            </div>
            <button
              className={
                this.state.action === CRUD_ACTIONS.UPDATE
                  ? 'btn btn-warning mt-3'
                  : 'btn btn-primary mt-3'
              }
              onClick={() => this.handleUser()}
            >
              <FormattedMessage
                id={
                  this.state.action === CRUD_ACTIONS.UPDATE
                    ? 'manage-user-redux.update'
                    : 'manage-user-redux.create'
                }
              />
            </button>
          </div>
        </div>

        <div className="container px-0 my-4">
          <TableViewUser
            handleEditUserFromParent={this.handleEditUserFromParent}
            action={this.state.action}
          />
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
    isCreateUserSuccess: state.admin.isCreateUserSuccess,
    users: state.admin.users,
    createUserErrorMessage: state.admin.createUserErrorMessage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (userData) => dispatch(actions.createNewUser(userData)),
    fetchAllUsers: () => dispatch(actions.fetchAllUsers()),
    updateUserStart: (userData) => dispatch(actions.updateUserStart(userData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux)
