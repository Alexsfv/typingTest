import React from 'react'
import LeadersSideBar from '../Components/LeadersSideBar/LeadersSideBar'
import LeadersBlock from '../Components/LeadersBlock/LeadersBlock'
import '../Components/Layout/container.scss'
import {connect} from 'react-redux'
import { getUsers, sortUsers } from '../store/actions/leaders'

class Leaders extends React.Component {

    sortUsersBy = (category = 'name') => {
    let [mobileUsers, desktopUsers] = [[...this.props.leaders.users.mobileUsers], [...this.props.leaders.users.desktopUsers]]
    const [, usersByDevice] = this.getUsersByPathName()
    const sorted = this.props.leaders.users.sorted ? 1 : -1
    const sortedUsers = {mobileUsers, desktopUsers}

    if (category === 'points') {
        sortedUsers[usersByDevice] = sortedUsers[usersByDevice].sort((a, b) => {
            return sorted * (+a.points - +b.points) 
        })

    } else if (category === 'name') {
        sortedUsers[usersByDevice] = sortedUsers[usersByDevice].sort((a,b) => {
        return sorted * (b.name.localeCompare(a.name))
        })

    } else if (category === 'date') {
        sortedUsers[usersByDevice] = sortedUsers[usersByDevice].sort((a,b) => {
        if (+a.date.year - +b.date.year !== 0) {
            return sorted * (+a.date.year - +b.date.year)
        } 
        if (+a.date.month - +b.date.month  !== 0) {
            return sorted * (+a.date.month - +b.date.month)
        }
        if (+a.date.day - +b.date.day  !== 0) {
            return sorted * (+a.date.day - +b.date.day)
        }
        return 0
        })
    }
    this.props.sortUsers(sortedUsers)
    }

    getUsersByPathName = () => {
    return this.props.location.pathname === "/leaders/desktop" 
                ? [this.props.leaders.users.desktopUsers, 'desktopUsers']
                : [this.props.leaders.users.mobileUsers, 'mobileUsers']
    }

    componentDidMount = () => {
        this.props.getUsers()
    }

    render() {
        const [deviceUsers] = this.getUsersByPathName()
        return (
            <div className="container">

                <LeadersSideBar 
                />

                <LeadersBlock
                    deviceUsers={deviceUsers}
                    sortUsersBy={this.sortUsersBy}
                    loader={this.props.leaders.loader}
                />
                           
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        leaders: state.leaders
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUsers: () => dispatch(getUsers()),
        sortUsers: sortedUsers => dispatch(sortUsers(sortedUsers))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Leaders)