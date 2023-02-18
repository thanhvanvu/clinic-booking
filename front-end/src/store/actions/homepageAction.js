import actionTypes from './actionTypes'
import { handleGetTopDoctors } from '../../services/userService'

import { toast } from 'react-toastify'

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
