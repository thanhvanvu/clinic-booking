import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import Header from '../containers/Header/Header'
import DoctorScheduleManage from '../containers/Doctor/DoctorScheduleManage'
import PatientManage from '../containers/System/Patient/PatientManage'
class Doctor extends Component {
  render() {
    // get value from redux
    const { isLoggedIn } = this.props

    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route
                path="/doctor/schedule-manage"
                component={DoctorScheduleManage}
              />
              <Route path="/doctor/patient-manage" component={PatientManage} />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Doctor)
