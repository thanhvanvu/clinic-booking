import actionTypes from './actionTypes'
import { handleGetAllCode } from '../../services/userService'
import { handleAddUserApi } from '../../services/userService'
import { getAllUsers } from '../../services/userService'
import { toast } from 'react-toastify'
import { handleDeleteUser } from '../../services/userService'

// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// })

// fetch Gender
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

// Fetch position
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

// Fetch role
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

// Create User
export const createNewUser = (userData) => {
  return async (dispatch, getState) => {
    try {
      let response = await handleAddUserApi(userData)

      if (response && response.errCode === 0) {
        toast.success('Create a new user successfully!')
        dispatch(createNewUserSuccess())
      } else {
        // if response is null
        dispatch(createNewUserFailed())
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

export const createNewUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
})

// Fetch all users
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

// Delete Users
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
