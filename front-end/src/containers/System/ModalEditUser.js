import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import './ModalAddNewUser.scss'
import { emitter } from '../../utils/emitter'
import _ from 'lodash'

class ModalEditUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      address: '',
    }
  }

  componentDidMount() {
    const currentUser = this.props.currentUser

    if (currentUser && !_.isEmpty(currentUser))
      this.setState({
        id: currentUser.id,
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        address: currentUser.address,
      })
  }

  // use function toggle to use the function from parent component
  toggle = () => {
    this.props.showHideModal()
  }

  handleOnchangeInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  // validate input from user
  checkValidateInput = () => {
    let isValid = true
    const input = ['firstName', 'lastName', 'address']

    for (let i = 0; i < input.length; i++) {
      const inputValue = input[i]
      if (!this.state[inputValue]) {
        isValid = false
        alert('Missing Parameter: ' + inputValue)
        break
      }
    }

    return isValid
  }

  // handleAddUser = async () => {
  //   try {
  //     // 1. validate input
  //     const isValidInput = this.checkValidateInput()

  //     if (isValidInput === true) {
  //       // 2. send the state data back to parent component
  //       this.props.createNewUser(this.state)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  handleEditUser = async () => {
    try {
      // 1. validate input
      const isValidInput = this.checkValidateInput()

      if (isValidInput === true) {
        // 2. send the state data back to parent component
        this.props.editUser(this.state)
      }
    } catch (error) {
      console.log(error)
    }
  }

  editUser = () => {}

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={this.props.className}
        size="lg"
        centered
      >
        <ModalHeader toggle={() => this.toggle()}>Edit User</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <form>
                <div className="form-row row">
                  <div className="form-group col-md-12">
                    <label className="modalLabel">Email:</label>
                    <input
                      disabled
                      type="text"
                      className="form-control"
                      placeholder="Enter Email"
                      value={this.state.email}
                      name="email"
                      onChange={(event) => this.handleOnchangeInput(event)}
                    />
                  </div>
                </div>
                <div className="form-row row mt-3">
                  <div className="form-group col-md-6">
                    <label className="modalLabel">First Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      placeholder="First Name"
                      value={this.state.firstName}
                      onChange={(event) => this.handleOnchangeInput(event)}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label className="modalLabel">Last Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      value={this.state.lastName}
                      onChange={(event) => this.handleOnchangeInput(event)}
                    />
                  </div>
                </div>

                <div className="form-row row mt-3">
                  <div className="form-group col-md-12">
                    <label className="modalLabel">Address:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputAddress"
                      placeholder="1234 Main St"
                      name="address"
                      value={this.state.address}
                      onChange={(event) => this.handleOnchangeInput(event)}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => this.handleEditUser()}
            className="px-3"
          >
            Edit User
          </Button>{' '}
          <Button
            color="secondary"
            onClick={() => this.toggle()}
            className="px-3"
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser)
