import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import * as actions from '../../store/actions'

import './Login.scss'
import { handleLoginApi } from '../../services/userService'
import { FormattedMessage } from 'react-intl'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      hidePassword: true,
      errorMessage: '',
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
  handleLogin = async () => {
    try {
      // clear errorMessage everytime user login
      this.setState({ errorMessage: '' })

      // call api in userService and save data into response
      const response = await handleLoginApi(
        this.state.email,
        this.state.password
      )

      if (response.errCode !== 0) {
        this.setState({ errorMessage: response.message })
      } else {
        this.props.userLoginSuccess(response.user)
        // save user infomation into redux
      }
    } catch (error) {
      console.log(error)
      this.setState({ errorMessage: error.response.data.message })
    }
  }

  // show hide password
  hidePassword = () => {
    this.setState({ hidePassword: !this.state.hidePassword })
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.handleLogin()
    }
  }

  render() {
    return (
      <div className="login-background">
        <div className="login-container" onSubmit={() => this.handleLogin()}>
          <div className="login-content row">
            <div className="col-12 text-login">Login</div>

            <div
              className="col-12 error-message-login"
              value={this.state.errorMessage}
            >
              {this.state.errorMessage}
            </div>

            <div className="col-12 form-group text-login-input">
              <label>Email:</label>
              <input
                name="email"
                value={this.state.email}
                onChange={(event) => this.handleOnchangeInput(event)}
                type="text"
                placeholder="Enter your email"
                className="form-control"
                onKeyDown={(event) => this.handleKeyDown(event)}
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
                  onKeyDown={(event) => this.handleKeyDown(event)}
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
                type="submit"
                className="login-button"
                onClick={() => this.handleLogin()}
                onKeyDown={(event) => this.handleKeyDown(event)}
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
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
