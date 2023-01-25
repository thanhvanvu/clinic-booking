import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './UserManage.scss'
import {
  getAllUsers,
  handleAddUserApi,
  handleDeleteUser,
  handleEditUserApi,
} from '../../services/userService'

import { emitter } from '../../utils/emitter'
import ModalAddNewUser from './ModalAddNewUser'
import ModalEditUser from './ModalEditUser'

class UserManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      isOpenModal: false,
      isEditModal: false,
      currentUser: {},
    }
  }

  // when component render, this function will run first
  async componentDidMount() {
    this.handleGetAllUsers()
  }

  showHideModal = () => {
    this.setState({
      isOpenModal: false,
      isEditModal: false,
    })
  }

  handleGetAllUsers = async () => {
    // 1. go to service to call api
    const response = await getAllUsers()

    // 4. check error code
    if (response && response.errCode === 0) {
      const users = response.usersData

      // setState is asycn/await, sometimes need to use callback
      this.setState({ users: users }, () => console.log())
    }
  }

  handleAddNewUser = () => {
    this.setState({
      isOpenModal: true,
    })
  }

  // handle create new user in parent component
  createNewUser = async (stateChildComponent) => {
    try {
      // 3. go to service to call api
      const response = await handleAddUserApi(stateChildComponent)

      // 6. check error code
      if (response.status === 'Fail') {
        alert(response.message)
      } else {
        // 7. if no error, refesh the page again (very important)
        await this.handleGetAllUsers()

        // 8. Close the modal
        this.showHideModal()

        // 9. clear modal data, then go to child component
        // emitter.on will catch the fire
        emitter.emit('EVENT_CLEAR_MODAL_DATA')
      }
    } catch (error) {
      console.log(error)
    }
  }

  handleEditUser = async (user) => {
    this.setState({ isEditModal: true })
    this.setState({
      currentUser: user,
    })
  }

  editUser = async (stateChildComponent) => {
    try {
      // 3. go to service to call api
      const response = await handleEditUserApi(stateChildComponent)

      // 6. check error code
      if (response.status === 'Fail') {
        alert(response.message)
      } else {
        // 7. if no error, refesh the page again (very important)
        await this.handleGetAllUsers()

        // 8. Close the modal
        this.showHideModal()
      }
    } catch (error) {
      console.log(error)
    }
  }

  deleteUser = async (user) => {
    try {
      if (window.confirm('Do you want to delete this user?')) {
        // 1. get user ID
        const userId = user.id

        // 2. Go to service with ID
        await handleDeleteUser(userId)

        // 5. Refesh the page real time
        this.handleGetAllUsers()
      }
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <div className="users-container px-2">
        {/* send prop to component */}
        <ModalAddNewUser
          isOpen={this.state.isOpenModal}
          showHideModal={this.showHideModal}
          createNewUser={this.createNewUser}
        />

        {/* to make sure componentDidMount get data */}
        {this.state.isEditModal && (
          <ModalEditUser
            isOpen={this.state.isEditModal}
            showHideModal={this.showHideModal}
            currentUser={this.state.currentUser}
            editUser={this.editUser}
          />
        )}

        <div className="title text-center">Manage Users Table</div>
        <div className="mx-1 text-right">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus" style={{ marginRight: 5 }}></i> Add New
            User
          </button>
        </div>
        <table id="customers" className="mt-3 ">
          <tbody>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>

            {this.state.users.map((user, index) => (
              <tr key={index}>
                <td>{user.email}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.address}</td>
                <td>
                  <button
                    className="btn-edit"
                    type="button"
                    onClick={() => this.handleEditUser(user)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn-delete"
                    type="button"
                    onClick={() => this.deleteUser(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(UserManage)
