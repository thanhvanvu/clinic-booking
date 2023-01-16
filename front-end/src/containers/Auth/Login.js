import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import * as actions from '../../store/actions'

import './Login.scss'
import { FormattedMessage } from 'react-intl'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      hidePassword: true,
    }
  }

  // set data from the form to states
  handleOnchangeInput = (event) => {
    // setState used to set a new state
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  // function to handle login button
  handleLogin = () => {
    console.log(this.state)
  }

  // show hide password
  hidePassword = () => {
    this.setState({ hidePassword: !this.state.hidePassword })
  }

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>

            <div className="col-12 form-group text-login-input">
              <label>Username:</label>
              <input
                name="username"
                value={this.state.username}
                onChange={(event) => this.handleOnchangeInput(event)}
                type="text"
                placeholder="Enter your username"
                className="form-control"
              ></input>
            </div>

            <div className="col-12 form-grou text-login-input">
              <label>Password:</label>
              <div className="custom-password">
                <input
                  name="password"
                  value={this.state.password}
                  onChange={(event) => this.handleOnchangeInput(event)}
                  type={this.state.hidePassword ? 'password' : 'text'}
                  placeholder="Enter your password"
                  className="form-control"
                ></input>
                <span onClick={() => this.hidePassword()}>
                  <i
                    className={
                      this.state.hidePassword
                        ? 'fas fa-eye-slash'
                        : 'fas fa-eye'
                    }
                  ></i>
                </span>
              </div>
            </div>

            <div className="col-12">
              <button
                className="login-button"
                onClick={() => this.handleLogin()}
              >
                Login
              </button>
            </div>

            <div className="col-12 ">
              <span className="password-forgotten">Forgot your password?</span>
            </div>

            <div className="col-12 text-center text-login-input mt-5">
              <span>Or Login with:</span>
            </div>

            <div className="col-12 social-login">
              <i className="fab fa-facebook-f facebook"></i>
              <i className="fab fa-google-plus-g google"></i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
