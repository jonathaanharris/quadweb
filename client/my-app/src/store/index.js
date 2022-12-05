import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import blogReducer from "./reducer/blogReducer"
import commentReducer from "./reducer/commentReducer"

const rootReducer = combineReducers({
  blogReducer,
  commentReducer
})

let store = createStore(rootReducer, applyMiddleware(thunk))

export default store