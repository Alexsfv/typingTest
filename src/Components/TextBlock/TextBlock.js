import React from 'react'
import './TextBlock.scss'

class TextBlock extends React.Component {

    render() {
        let countIndexOfChar = 0

        return (
            <div className="textBlock">
                <div className="needText">

                    {
                        this.props.area.words.map((word, ind) => {
                            return (
                                <div className="word" key={word + ind}>
                                    {
                                        word.split('').map((char, i) => {
                                            const answeredChar = this.props.area.answeredChars[countIndexOfChar]
                                            countIndexOfChar++
                                            if (answeredChar) {
                                                const classes = 'letter ' + answeredChar.class
                                                return <span className={classes} key={char + i + ind}>{char}</span>
                                            } else {
                                                return <span className="letter" key={char + i + ind}>{char}</span>
                                            }
                                        }) 
                                    }
                                </div>
                            )
                        })
                    }

                </div>
                
                <form>
                    <textarea 
                        className="userText" 
                        placeholder="Для старта начните ввод" 
                        onCopy={e => e.preventDefault()}
                        onPaste={e => e.preventDefault()}
                        onCut={e => e.preventDefault()}
                        onChange={e => this.props.handleAreaInput(e)}
                        disabled={this.props.isDisabledArea}
                        value={this.props.area.value}
                    />
                </form>
                
            </div>
        )
    }
}

export default TextBlock