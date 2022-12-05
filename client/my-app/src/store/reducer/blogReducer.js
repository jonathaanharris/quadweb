import { BLOG_FETCH_SUCCESS } from "../action/type"

const initialState = {
  blogs: []
}

function blogReducer(state = initialState, action) {
  if (action.type === BLOG_FETCH_SUCCESS) {
    return {
      ...state, blogs: action.data
    }
  }
  return state
}

export default blogReducer