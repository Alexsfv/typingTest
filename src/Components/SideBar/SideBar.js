import React from 'react'
import './SideBar.scss'
import '../UI/Btn/Btn.scss'
import Timer from '../UI/Timer/Timer'
import {Link} from 'react-router-dom'
import device from 'current-device'

class SideBar extends React.Component {
    
    render() {
        const leadersPath = device.type === 'mobile' ? '/leaders/mobile' : '/leaders/desktop'

        return (
            <div className='SideBar'>
                <Timer seconds={this.props.seconds} started={this.props.startedTimer} finishedTimer={this.props.finishedTimer}/>

                <div className="buttons">
                    <button 
                        className="btn btn-start btn-blue" 
                        onClick={this.props.startTimer}
                        disabled={this.props.startedTimer ? true : false}
                    >
                        Старт
                    </button>

                    <button 
                        className="btn" 
                        onClick={this.props.resetTimer} 
                        disabled={this.props.startedTimer ? false : true}
                    >
                        Сброс
                    </button>

                    <Link className='btn btn-orange btn-last' to={leadersPath}>Лидеры</Link>
                </div>

            </div>
        )
    }
}

export default SideBar