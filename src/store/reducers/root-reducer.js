import {combineReducers} from 'redux'
import leadersReducer from './leaders'
import mainReducer from './main'

export default combineReducers({
    leaders: leadersReducer,
    main: mainReducer
})