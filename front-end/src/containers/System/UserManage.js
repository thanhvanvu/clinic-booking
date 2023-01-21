import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './UserManage.scss'
import { getAllUsers } from '../../services/userService'

class UserManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
    }
  }

  // when component render, this function will run first
  async componentDidMount() {
    const response = await getAllUsers()

    if (response && response.errCode === 0) {
      const users = response.usersData

      // setState is asycn/await, sometimes need to use callback
      this.setState({ users: users }, () => console.log())
    }

    console.log(this.state.users)
  }

  render() {
    return (
      <div className="users-container px-2">
        <div className="title text-center">Manage Users Table</div>
        <table id="customers" className="mt-3 ">
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Action</th>
          </tr>

          {this.state.users.map((user, index) => (
            <tr>
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
