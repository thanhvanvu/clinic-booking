import actionTypes from '../actions/actionTypes'

const initialState = {
  isLoading: false,
  genders: [],
  positions: [],
  roles: [],
  allTime: [],
  isCreateUserSuccess: '',
  users: [],
  createUserErrorMessage: [],
  doctors: [],
  isSuccess: false,
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    //#region  FETCH GENDER
    case actionTypes.FETCH_GENDER_START:
      state.isLoading = true
      return {
        ...state,
      }
    case actionTypes.FETCH_GENDER_SUCCESS:
      let genderArr = action.data

      // never modify the initial state directly
      state.genders = genderArr

      state.isLoading = false

      return {
        ...state,
      }
    case actionTypes.FETCH_GENDER_FAILED:
      state.genders = []
      state.isLoading = false
      return {
        ...state,
      }
    //#endregion

    //#region  FETCH POSITION
    case actionTypes.FETCH_POSITION_START:
      state.isLoading = true
      return {
        ...state,
      }
    case actionTypes.FETCH_POSITION_SUCCESS:
      let positionArr = action.data

      // always make a copy of state, never modify the initial state directly
      state.positions = positionArr

      state.isLoading = false
      return {
        ...state,
      }
    case actionTypes.FETCH_POSITION_FAILED:
      state.isLoading = false
      return {
        ...state,
      }
    //#endregion

    //#region  FETCH ROLE
    case actionTypes.FETCH_ROLE_START:
      state.isLoading = true
      return {
        ...state,
      }
    case actionTypes.FETCH_ROLE_SUCCESS:
      let roleArr = action.data

      // always make a copy of state, never modify the initial state directly
      state.roles = roleArr

      state.isLoading = false
      return {
        ...state,
      }
    case actionTypes.FETCH_ROLE_FAILED:
      state.isLoading = false
      return {
        ...state,
      }
    //#endregion

    //#region  FETCH TIME
    case actionTypes.FETCH_ALL_TIME_SUCCESS:
      let timeArr = action.data

      // always make a copy of state, never modify the initial state directly
      state.allTime = timeArr

      state.isLoading = false
      return {
        ...state,
      }
    case actionTypes.FETCH_ALL_TIME_FAILED:
      state.isLoading = false
      return {
        ...state,
      }
    //#endregion

    //#region  CREATE USER
    case actionTypes.CREATE_USER_SUCCESS:
      // always make a copy of state, never modify the initial state directly
      state.isCreateUserSuccess = true
      state.createUserErrorMessage = ''
      return {
        ...state,
      }
    case actionTypes.CREATE_USER_FAILED:
      state.isCreateUserSuccess = false
      state.createUserErrorMessage = action.action.message
      return {
        ...state,
      }
    //#endregion

    //#region  FETCH USERS
    case actionTypes.FETCH_USERS_SUCCESS:
      // always make a copy of state, never modify the initial state directly
      state.users = action.data
      return {
        ...state,
      }
    case actionTypes.FETCH_USERS_FAILED:
      return {
        ...state,
      }
    //#endregion

    //#region  UPDATE USERS
    case actionTypes.UPDATE_USER_SUCCESS:
      // always make a copy of state, never modify the initial state directly

      return {
        ...state,
      }
    case actionTypes.UPDATE_USER_FAILED:
      return {
        ...state,
      }
    //#endregion

    //#region  FETCH ALL DOCTORS
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      // always make a copy of state, never modify the initial state directly
      state.doctors = action.data

      return {
        ...state,
      }
    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      return {
        ...state,
      }
    //#endregion

    //#region  CREATE DOCTOR INFORMATION
    case actionTypes.CREATE_DETAIL_DOCTOR_SUCCESS:
      // always make a copy of state, never modify the initial state directly
      state.isSuccess = true
      return {
        ...state,
      }
    case actionTypes.CREATE_DETAIL_DOCTOR_FAILED:
      return {
        ...state,
      }
    //#endregion
    default:
      return state
  }
}

export default appReducer
