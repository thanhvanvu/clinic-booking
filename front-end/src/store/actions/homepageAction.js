import actionTypes from './actionTypes'
import {
  handleGetTopDoctors,
  getDetailDoctorById,
} from '../../services/userService'

export const fetchTopDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let response = await handleGetTopDoctors('10')
      let doctorsData = response.data
      if (response && response.errCode === 0) {
        dispatch(fetchTopDoctorsSuccess(doctorsData))
      } else {
        // if response is null
        dispatch(fetchTopDoctorsFail())
      }
    } catch (error) {
      // case call APi fail
      console.log(error)
      dispatch(fetchTopDoctorsFail())
    }
  }
}

export const fetchTopDoctorsSuccess = (doctorsData) => ({
  type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
  data: doctorsData,
})

export const fetchTopDoctorsFail = () => ({
  type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
})

export const getDetailDoctorByIdRedux = (doctorId) => {
  return async (dispatch, getState) => {
    try {
      let response = await getDetailDoctorById(doctorId)
      let doctorData = response.data
      if (response && response.errCode === 0) {
        dispatch(getDetailDoctorByIdSuccess(doctorData))
      } else {
        // if response is null
        dispatch(getDetailDoctorByIdFailed())
      }
    } catch (error) {
      // case call APi fail
      console.log(error)
      dispatch(getDetailDoctorByIdFailed())
    }
  }
}

export const getDetailDoctorByIdSuccess = (doctorData) => ({
  type: actionTypes.GET_CURRENT_DOCTOR_SUCCESS,
  data: doctorData,
})

export const getDetailDoctorByIdFailed = () => ({
  type: actionTypes.GET_CURRENT_DOCTOR_FAILED,
})
