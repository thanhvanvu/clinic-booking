import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import './TableViewUser.scss'
import * as actions from '../../../store/actions'
// import style manually
import 'react-markdown-editor-lite/lib/index.css'

class TableViewUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usersRedux: [],
    }
  }

  async componentDidMount() {
    this.props.fetchAllUsers()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.users !== this.props.users) {
      this.setState({ usersRedux: this.props.users })
    }
  }

  handleDeleteUser = async (user) => {
    let userId = user.id

    if (window.confirm('Are you sure to delete this user ?')) {
      // fire redux event
      await this.props.deleteUserStart(userId)
    }

    // refresh the table to show updated data
    this.props.fetchAllUsers()
  }

  handleEditUser = async (user) => {
    // call function from parent, then pass the paramater to it
    this.props.handleEditUserFromParent(user)
  }

  render() {
    return (
      <React.Fragment>
        <table id="customers">
          <tbody>
            <tr>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
            {this.state.usersRedux.map((user, index) => (
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
                    onClick={() => this.handleDeleteUser(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.admin.users,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUsers: () => dispatch(actions.fetchAllUsers()),
    deleteUserStart: (userId) => dispatch(actions.deleteUserStart(userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableViewUser)
