import React from 'react'
import './Loader.scss'

class Loader extends React.Component {

  render() {
    let classes = ['lds-ring']
    classes = classes.concat(this.props.classes)

    return (
        <div className={classes.join(' ')}>
            <div></div><div></div><div></div><div></div>
        </div>
    )
  }
}

export default Loader