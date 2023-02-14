import actionTypes from '../actions/actionTypes'

const initialState = {
  isLoading: false,
  genders: [],
  positions: [],
  roles: [],
  isCreateUserSuccess: '',
  users: [],
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    //---------------FETCH GENDER--------------------------//
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

    //---------------FETCH POSITION--------------------------//
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

    //---------------FETCH ROLE--------------------------//
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

    //---------------CREATE USER--------------------------//
    case actionTypes.CREATE_USER_SUCCESS:
      // always make a copy of state, never modify the initial state directly
      state.isCreateUserSuccess = true

      return {
        ...state,
      }
    case actionTypes.CREATE_USER_FAILED:
      state.isCreateUserSuccess = false
      return {
        ...state,
      }

    //---------------FETCH USERS--------------------------//
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
    default:
      return state
  }
}

export default appReducer
