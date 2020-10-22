import React from 'react'
import './SideBar.scss'
import '../UI/Btn/Btn.scss'
import Timer from '../UI/Timer/Timer'
import {Link} from 'react-router-dom'

class SideBar extends React.Component {
    
    render() {
        return (
            <div className='SideBar'>
                <Timer seconds={this.props.seconds} started={this.props.startedTimer}/>

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

                    {/* <button 
                        className="btn btn-limon btn-anim-pulse-scale" 
                        onClick={this.props.stopTimer} 
                        disabled={this.props.finishedTimer ? false : true}
                    >
                        Сохранить
                    </button> */}

                    <Link className='btn btn-orange btn-last' to='/leaders'>Лидеры</Link>
                </div>

            </div>
        )
    }
}

export default SideBar