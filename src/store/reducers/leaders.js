import {LEADERS_GET_USERS, LEADERS_SORT_USERS} from '../actions/actionTypes'

const initialState = {
    users: {
        mobileUsers: [],
        desktopUsers: [],
        sorted: false
    },
    loader: true,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LEADERS_GET_USERS: {
            return {
                ...state,
                users: action.users,
                loader: action.loader,
            }
        }
        case LEADERS_SORT_USERS: {
            return {
                ...state,
                users: {
                    ...state.users,
                    mobileUsers: action.users.mobileUsers,
                    desktopUsers: action.users.desktopUsers,
                    sorted: action.users.sorted
                }
            }
        }
        default: {
            return state
        }
    }
}