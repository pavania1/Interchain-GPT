import sessionReducer from './sessionReducer'
import {combineReducers} from 'redux'


export default combineReducers({
    session: sessionReducer
})