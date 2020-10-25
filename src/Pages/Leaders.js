import React from 'react'
import LeadersSideBar from '../Components/LeadersSideBar/LeadersSideBar'
import LeadersBlock from '../Components/LeadersBlock/LeadersBlock'
import '../Components/Layout/container.scss'
import {getMobileUsers, getDesktopUsers} from '../database'

class Leaders extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      sideBar: {

      },

      leaders: {      
        users: {
          mobileUsers: [],
          desktopUsers: [],
          sorted: false
        },

        loader: true,

      },


    }
  }

    sortUsersBy = (category = 'name') => {
    let [mobileUsers, desktopUsers] = [[...this.state.leaders.users.mobileUsers], [...this.state.leaders.users.desktopUsers]]
    const [, usersByDevice] = this.getUsersByPathName()
    const sorted = this.state.leaders.users.sorted ? 1 : -1
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
            console.log(+a.date.year - +b.date.year);
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

    this.setState({
        leaders: {
        ...this.state.leaders,
        users: {
            ...this.state.leaders.users,
            mobileUsers: sortedUsers.mobileUsers,
            desktopUsers: sortedUsers.desktopUsers,
            sorted: !this.state.leaders.users.sorted
        }
        }
    })


    }

    getUsersByPathName = () => {
    return this.props.location.pathname === "/leaders/desktop" 
                ? [this.state.leaders.users.desktopUsers, 'desktopUsers']
                : [this.state.leaders.users.mobileUsers, 'mobileUsers']
    }

    componentDidMount = async () => {
        try {
            const rowMobileUsers = await getMobileUsers()
            const rowDesktopUsers = await getDesktopUsers()

            const mobileUsers = Object.values(rowMobileUsers)
            const desktopUsers = Object.values(rowDesktopUsers)

            this.setState({
                leaders: {
                    ...this.state.leaders,
                    users: {
                        ...this.state.leaders.users,
                        mobileUsers,
                        desktopUsers
                    },
                    loader: false,
                }
            })

        } catch(e) {
            console.log(e)
        }

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
                    loader={this.state.leaders.loader}
                />
            
            </div>
        )
    }
}

export default Leaders