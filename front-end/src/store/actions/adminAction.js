import actionTypes from './actionTypes'
import { handleGetAllCode } from '../../services/userService'

// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// })

// fetch Gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
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
// export const fetchPositionStart = () => {
//   return async (dispatch, getState) => {
//     try {
//       let response = await handleGetAllCode('POSITION')

//       if (response && response.errCode === 0) {
//         dispatch(fetchPositionSuccess(response.type))
//       } else {
//         // if response is null
//         dispatch(fetchPositionFailed())
//       }
//     } catch (error) {
//       // case call APi fail
//       console.log(error)
//       dispatch(fetchPositionFailed())
//     }
//   }
// }

// export const fetchPositionSuccess = (positionData) => ({
//   type: actionTypes.FETCH_POSITION_SUCCESS,
//   data: positionData,
// })

// export const fetchPositionFailed = () => ({
//   type: actionTypes.FETCH_POSITION_FAILED,
// })
