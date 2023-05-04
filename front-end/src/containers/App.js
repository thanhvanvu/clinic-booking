import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter as Router } from 'connected-react-router'
import { history } from '../redux'
import { ToastContainer } from 'react-toastify'
import HomePage from './HomePage/HomePage'
import CustomScrollbars from '../components/CustomScrollbars'

import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from '../hoc/authentication'

import { path } from '../utils'

import Home from '../routes/Home'
// import Login from '../routes/Login'
import Login from './Auth/Login'
import System from '../routes/System'

import DoctorDetail from './Patient/Doctor/DoctorDetail'
import Doctor from '../routes/Doctor'
import VerifyEmail from './Patient/VerifyEmail'
import SpecialistDetail from './Patient/Specialist/SpecialistDetail'
import ClinicDetail from './Patient/Clinic/ClinicDetail'
import SpecialistListView from './Patient/Specialist/SpecialistListView'
import ClinicListView from './Patient/Clinic/ClinicListView'
import DoctorListView from './Patient/Doctor/DoctorListView'

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props
    let { bootstrapped } = persistor.getState()
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }))
      } else {
        this.setState({ bootstrapped: true })
      }
    }
  }

  componentDidMount() {
    this.handlePersistorState()
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <div className="content-container">
              <CustomScrollbars style={{ height: '100vh', width: '100%' }}>
                <Switch>
                  <Route path={path.HOME} exact component={Home} />
                  <Route path={path.HOMEPAGE} exact component={HomePage} />
                  <Route
                    path={path.LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />
                  <Route
                    path={path.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                  <Route
                    path="/doctor"
                    component={userIsAuthenticated(Doctor)}
                  />
                  <Route path={path.DETAIL_DOCTOR} component={DoctorDetail} />
                  <Route
                    path={path.LIST_VIEW_DOCTOR}
                    component={DoctorListView}
                  />

                  <Route
                    path={path.DETAIL_SPECIALIST}
                    component={SpecialistDetail}
                  />
                  <Route
                    path={path.LIST_VIEW_SPECIALIST}
                    component={SpecialistListView}
                  />

                  <Route path={path.DETAIL_CLINIC} component={ClinicDetail} />
                  <Route
                    path={path.LIST_VIEW_CLINIC}
                    component={ClinicListView}
                  />

                  <Route
                    path={path.VERIFY_EMAIL_BOOKING}
                    component={VerifyEmail}
                  />
                </Switch>
              </CustomScrollbars>
            </div>

            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
        </Router>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
