import { FETCH_ERROR, COMMENT_FETCH_SUCCESS } from "../action/type"

const initialState = {
  comments: null,
  errComment: null
}

function commentReducer(state = initialState, action) {
  if (action.type === COMMENT_FETCH_SUCCESS) {
    return {
      ...state, comments: action.data
    }
  }
  if (action.type === FETCH_ERROR) {
    return {
      ...state, err: action.data
    }
  }
  return state
}

export default commentReducer