import React from 'react'
import './Timer.scss'

class Timer extends React.Component {

    render() {

        return (
            <div className="Timer">
                <p className={this.props.started ? 'start' : null}>
                    {this.props.seconds + 'c'}
                </p>
            </div>
        )
    }
}

export default Timer