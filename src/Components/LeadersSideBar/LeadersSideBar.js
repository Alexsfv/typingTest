import React from 'react'
import {NavLink} from 'react-router-dom'
// import './LeadersSideBar.scss'
import device from 'current-device'

class LeadersSideBar extends React.Component {

  render() {

    return (
        <React.Fragment>
            <div className="SideBar"> 

                <div className="buttons">

                    <NavLink to='/' className="btn btn-blue">Тест</NavLink>

                    <div className='device'>
                        <p>Ваше устройство</p>
                        {
                            device.type === "desktop"
                                ? <p><i className="fa fa-desktop" aria-hidden="true" /> Desktop</p>
                                : <p><i className="fa fa-mobile" aria-hidden="true" /> Phone </p>
                        }
                    </div>
                    
                </div>

            </div>
        </React.Fragment>
    )
  }
}

export default LeadersSideBar