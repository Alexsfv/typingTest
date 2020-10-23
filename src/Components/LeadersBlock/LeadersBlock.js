import React from 'react'
import { NavLink } from 'react-router-dom'
import './LeadersBlock.scss'

class LeadersBlock extends React.Component {

    render() {
        const deviceUsers = this.props.deviceUsers
        
        return (
            <div className="leaders">

                    <ul className="leadersMenu">
                        
                        <li><NavLink to='/leaders/mobile' activeClassName='passed'>
                            Phone <i className="fa fa-mobile" aria-hidden="true" />
                        </NavLink></li>

                        <li><NavLink to='/leaders/desktop' activeClassName='passed'>
                            Desktop <i className="fa fa-desktop" aria-hidden="true" />
                        </NavLink></li>
                    </ul>

                    <ul className="Header">
                        <li>#</li>

                        <li onClick={e => this.props.sortUsersBy('name')}>
                            Никнейм <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                        </li>

                        <li onClick={e => this.props.sortUsersBy('points')}>
                            Очки <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                        </li>
                        <li onClick={e => this.props.sortUsersBy('date')}>
                            Дата <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                        </li>
                    </ul>


                    <div className="users-list">

                        {
                            deviceUsers.map((user, index) => (
                                <ul className="user" key={user.name + user.points}>
                                    <li>{index + 1}</li>
                                    <li>{user.name}</li>
                                    <li>{user.points}</li>
                                    <li>{user.date.string}</li>
                                </ul>
                            ))
                        }

                    </div>
                </div>
        )
    }
}

export default LeadersBlock