import React from 'react'
import LeadersSideBar from '../Components/LeadersSideBar/LeadersSideBar'
import LeadersBlock from '../Components/LeadersBlock/LeadersBlock'
import '../Components/Layout/container.scss'
// import '../Components/LeadersSideBar/LeadersSideBar.scss'

class Leaders extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      sideBar: {

      },

      leaders: {      
        users: {
          mobileUsers: [
            { name: 'Что где когда', 
              points: 254, 
              date: {
                string: '01-10-2006',
                year: '2006',
                month: '10',
                day: '01'
              }
            },
            { name: 'Мария', 
              points: 110, 
              date: {
                string: '24-02-1004',
                year: '1004',
                month: '02',
                day: '24'
              }
            },
            { name: 'Дмитрий Куда пошел', 
              points: 10, 
              date: {
                string: '21-09-2006',
                year: '2006',
                month: '09',
                day: '21'
              }
            },
            { name: 'Лист бумаги', 
              points: 560, 
              date: {
                string: '22-09-2006',
                year: '2006',
                month: '09',
                day: '22'
              }
            },
          ],

          desktopUsers: [
            { name: 'Арбуз Иванович', 
              points: 254, 
              date: {
                string: '24-09-2004',
                year: '2004',
                month: '09',
                day: '24'
              }
            },
            { name: 'Голубь Валерий Геннадьевич', 
              points: 110, 
              date: {
                string: '24-02-2884',
                year: '2884',
                month: '02',
                day: '24'
              }
            },
            { name: 'Олег Прилёг', 
              points: 10, 
              date: {
                string: '21-09-2006',
                year: '2006',
                month: '09',
                day: '21'
              }
            },
            { name: 'Гадюка Валерьевна', 
              points: 50, 
              date: {
                string: '21-09-3111',
                year: '3111',
                month: '09',
                day: '21'
              }
            }
          ],
          sorted: false,
        }
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

  render() {
    const [deviceUsers] = this.getUsersByPathName()

    return (
    
      <div className="container">

        <LeadersSideBar 
        />

        <LeadersBlock
          deviceUsers={deviceUsers}
          sortUsersBy={this.sortUsersBy}
        />
      
      </div>

    )
  }
}

export default Leaders