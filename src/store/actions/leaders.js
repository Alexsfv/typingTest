import {LEADERS_GET_USERS, LEADERS_SORT_USERS} from './actionTypes'
import {getMobileUsers, getDesktopUsers} from '../../database'

export function getUsers() {
    return async dispatch => {
        try {
            const rowMobileUsers = await getMobileUsers()
            const rowDesktopUsers = await getDesktopUsers()

            const mobileUsers = Object.values(rowMobileUsers)
            const desktopUsers = Object.values(rowDesktopUsers)

            dispatch(getUsersCreator(mobileUsers, desktopUsers))

        } catch(e) {
            console.log(e)
        }
    }
}

export function sortUsers(sortedUsers) {
    return (dispatch, getState) => {
        dispatch({
            type: LEADERS_SORT_USERS,
            users: {
                mobileUsers: sortedUsers.mobileUsers,
                desktopUsers: sortedUsers.desktopUsers,
                sorted: !getState().leaders.users.sorted
            }
        })
    }
}


function getUsersCreator(mobileUsers, desktopUsers) {
    return {
        type: LEADERS_GET_USERS,
        users: {
            mobileUsers,
            desktopUsers
        },
        loader: false,
    }
}