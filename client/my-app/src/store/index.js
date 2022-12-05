import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import blogReducer from "./reducer/blogReducer"

const rootReducer = combineReducers({
  blogReducer
})

let store = createStore(rootReducer, applyMiddleware(thunk))

export default store