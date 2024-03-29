import actionTypes from './actionTypes'
import {
  handleGetAllCode,
  handleAddUserApi,
  getAllUsers,
  handleDeleteUser,
  handleEditUserApi,
  handleGetAllDoctors,
  handleCreateDoctorInfo,
} from '../../services/userService'

import { toast } from 'react-toastify'

//#region  fetch Gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      })

      let response = await handleGetAllCode('GENDER')

      if (response && response.errCode === 0) {
        dispatch(fetchGenderSuccess(response.type))
      } else {
        // if response is null
        dispatch(fetchGenderFailed())
      }
    } catch (error) {
      // case call APi fail
      console.log(error)
      dispatch(fetchGenderFailed())
    }
  }
}

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
})

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
})
//#endregion

//#region  Fetch position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_POSITION_START })

      let response = await handleGetAllCode('POSITION')

      if (response && response.errCode === 0) {
        dispatch(fetchPositionSuccess(response.type))
      } else {
        // if response is null
        dispatch(fetchPositionFailed())
      }
    } catch (error) {
      // case call APi fail
      console.log(error)
      dispatch(fetchPositionFailed())
    }
  }
}

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
})

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
})
//#endregion

//#region  Fetch role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ROLE_START })

      let response = await handleGetAllCode('ROLE')

      if (response && response.errCode === 0) {
        dispatch(fetchRoleSuccess(response.type))
      } else {
        // if response is null
        dispatch(fetchRoleFailed())
      }
    } catch (error) {
      // case call APi fail
      console.log(error)
      dispatch(fetchRoleFailed())
    }
  }
}

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
})

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
})
//#endregion

//#region  fetch Time
export const fetchTimeStart = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({ type: actionTypes.FETCH_ROLE_START })

      let response = await handleGetAllCode('TIME')

      if (response && response.errCode === 0) {
        dispatch(fetchTimeSuccess(response.type))
      } else {
        // if response is null
        dispatch(fetchTimeFailed())
      }
    } catch (error) {
      // case call APi fail
      console.log(error)
      dispatch(fetchTimeFailed())
    }
  }
}

export const fetchTimeSuccess = (roleData) => ({
  type: actionTypes.FETCH_ALL_TIME_SUCCESS,
  data: roleData,
})

export const fetchTimeFailed = () => ({
  type: actionTypes.FETCH_ALL_TIME_FAILED,
})
//#endregion

//#region  Create User
export const createNewUser = (userData) => {
  return async (dispatch, getState) => {
    try {
      let response = await handleAddUserApi(userData)

      if (response && response.errCode === 0) {
        toast.success('Create a new user successfully!')
        dispatch(createNewUserSuccess())
      } else {
        toast.error('Failed to create a new user')
        dispatch(createNewUserFailed(response))
      }
    } catch (error) {
      // case call APi fail
      console.log(error)
      dispatch(createNewUserFailed())
    }
  }
}

export const createNewUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
})

export const createNewUserFailed = (response) => ({
  type: actionTypes.CREATE_USER_FAILED,
  action: response,
})
//#endregion

//#region  Fetch all users
export const fetchAllUsers = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getAllUsers()

      if (response && response.errCode === 0) {
        // sort reverse data
        response.usersData.reverse()
        dispatch(fetchAllUsersSuccess(response.usersData))
      } else {
        // if response is null
        dispatch(fetchAllUsersFailed())
      }
    } catch (error) {
      // case call APi fail
      console.log(error)
      dispatch(fetchAllUsersFailed())
    }
  }
}

export const fetchAllUsersSuccess = (usersData) => ({
  type: actionTypes.FETCH_USERS_SUCCESS,
  data: usersData,
})

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_USERS_FAILED,
})
//#endregion

//#region  Delete Users
export const deleteUserStart = (userId) => {
  return async (dispatch, getState) => {
    try {
      let response = await handleDeleteUser(userId)

      if (response && response.errCode === 0) {
        toast.error('Delete user succesfully!')
        dispatch(deleteUserSuccess())
      } else {
        // if response is null
        toast.error('Delete user failed!')
        dispatch(deleteUserFail())
      }
    } catch (error) {
      // case call APi fail
      console.log(error)
      dispatch(deleteUserFail())
    }
  }
}

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUserFail = () => ({
  type: actionTypes.DELETE_USER_FAILED,
})
//#endregion

//#region  Update user
export const updateUserStart = (userId) => {
  return async (dispatch, getState) => {
    try {
      let response = await handleEditUserApi(userId)

      if (response && response.errCode === 0) {
        toast.success('Update user succesfully!')
        dispatch(updateUserSuccess())
      } else {
        // if response is null
        toast.error('Update user failed!')
        dispatch(updateUserFail())
      }
    } catch (error) {
      // case call APi fail
      console.log(error)
      dispatch(updateUserFail())
    }
  }
}

export const updateUserSuccess = () => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
})

export const updateUserFail = () => ({
  type: actionTypes.UPDATE_USER_FAILED,
})
//#endregion

//#region  Get All Doctors
export const getAllDoctorsStart = () => {
  return async (dispatch, getState) => {
    try {
      let response = await handleGetAllDoctors()

      if (response && response.errCode === 0) {
        dispatch(fetchAllDoctorsSuccess(response.data))
      } else {
        // if response is null
        dispatch(fetchAllDoctorsFailed())
      }
    } catch (error) {
      // case call APi fail
      console.log(error)
      dispatch(fetchAllDoctorsFailed())
    }
  }
}

export const fetchAllDoctorsSuccess = (doctorsData) => ({
  type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
  data: doctorsData,
})

export const fetchAllDoctorsFailed = () => ({
  type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
})
//#endregion

//#region  Create doctor information
export const createDoctorInfoStart = (doctorInfo) => {
  return async (dispatch, getState) => {
    try {
      let response = await handleCreateDoctorInfo(doctorInfo)

      if (response && response.errCode === 0) {
        toast.success('Create a doctor information successfully!')
        dispatch(createDoctorInfoSuccess())
      } else {
        // if response is null
        toast.error('Create a doctor information failed!')
        dispatch(createDoctorInfoFailed())
      }
    } catch (error) {
      // case call APi fail
      console.log(error)
      toast.succeerrorss('Create a doctor information failed!')
      dispatch(createDoctorInfoFailed())
    }
  }
}

export const createDoctorInfoSuccess = (doctorsData) => ({
  type: actionTypes.CREATE_DETAIL_DOCTOR_SUCCESS,
})

export const createDoctorInfoFailed = () => ({
  type: actionTypes.CREATE_DETAIL_DOCTOR_FAILED,
})
//#endregion
