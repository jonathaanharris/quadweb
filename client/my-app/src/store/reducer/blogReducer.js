import { BLOG_FETCH_SUCCESS, BLOG_DETAIL_SUCCESS, FETCH_ERROR } from "../action/type"

const initialState = {
  blogs: [],
  blogDetail: null,
  err: null,
}

function blogReducer(state = initialState, action) {
  if (action.type === BLOG_FETCH_SUCCESS) {
    return {
      ...state, blogs: action.data
    }
  }
  if (action.type === BLOG_DETAIL_SUCCESS) {
    return {
      ...state, blogDetail: action.data
    }
  }
  if (action.type === FETCH_ERROR) {
    return {
      ...state, err: action.data
    }
  }
  return state
}

export default blogReducer