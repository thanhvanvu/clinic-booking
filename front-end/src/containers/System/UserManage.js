import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './UserManage.scss'
import { getAllUsers, handleAddUserApi } from '../../services/userService'
import ModalAddNewUser from './ModalAddNewUser'

class UserManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      isOpenModal: false,
    }
  }

  // when component render, this function will run first
  async componentDidMount() {
    this.handleGetAllUsers()
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

  showHideModal = () => {
    this.setState({
      isOpenModal: false,
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
        this.handleGetAllUsers()

        // 8. Close the modal
        this.showHideModal()
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
                  <a href="#">
                    <button className="btn-edit" type="button">
                      Edit
                    </button>
                  </a>
                  <a href="#">
                    <button className="btn-delete" type="button">
                      Delete
                    </button>
                  </a>
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
