import { combineReducers } from 'redux'
import auth from './authReducer'
import employ from './employReducer'

export default combineReducers({
    auth,
    employ
})