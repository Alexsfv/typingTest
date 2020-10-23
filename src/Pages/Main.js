import React from 'react'
import SideBar from '../Components/SideBar/SideBar'
import '../Components/Layout/container.scss'
import TextBlock from '../Components/TextBlock/TextBlock'
import RecordModal from '../Components/RecordModal/RecordModal'


class Main extends React.Component {

    constructor(props) {
        super(props)

        const sentence = 'Едва слышимые в окружающем шуме, звуки музыки доносились из дома, который стоял на окраине. На тело, погружаемое в воду, действует выталкивающая сила, как гласит закон Архимеда.'
        
        const chars = sentence.trim().split('')
        const words = this.getWords(chars)
        const maxSeconds = 1

        this.state = {
            timer: {
                maxSeconds,
                seconds: maxSeconds,
                started: false,
                finished: false,
                intervalId: null,
            },
            area: {
                value: '',
                words,
                chars,
                answeredChars: [],
                sentence,
                successWords: 0,
            },
            recordModal: {
                result: 0,
                isShow: false,
                showTimeout: 1000,
                valid: true,
                showLoader: false,
                nameValue: '',
                statusSendName: '',
                alert: {
                    isShowAlert: false,
                    message: ''
                }
            }
        }
    }

    startTimer = () => {
        if (!this.state.timer.finished) {
            const delay = 1000
            
            const timerId = setInterval(() => {

                if (this.state.timer.seconds <= 1 && this.state.timer.seconds > 0) {
                    clearInterval(timerId)
                    this.stopTest()
                    return
                }
    
                this.setState({
                    timer: {
                        ...this.state.timer,
                        seconds: this.state.timer.seconds - 1
                    }
                })
            }, delay); 

            this.setState(state => ({
                timer: {...state.timer, started: true, intervalId: timerId}
            }))
        }
    }

    resetTimer = () => {
        clearInterval(this.state.timer.intervalId)
        this.setState({
            timer: {
                ...this.state.timer,
                seconds: this.state.timer.maxSeconds,
                started: false,
                finished: false,
                intervalId: null,
            },
            area: {
                ...this.state.area,
                value: '',
                answeredChars: [],
            },
            recordModal: {
                ...this.state.recordModal,
                result: 0,
                isShow: false,
                valid: true,
                showLoader: false,
                statusSendName: '',
                nameValue: '',
                alert: {
                    ...this.state.recordModal.alert.isShowAlert.alert,
                    isShowAlert: false,
                    message: ''
                }
            }
        })
    }

    stopTest = () => {
        const perSecond = this.state.area.successWords / this.state.timer.maxSeconds
        const result = (perSecond * 60).toFixed(1)

        const text = this.getCorrectText(result)
        this.setState(state => ({
            timer: {
                ...state.timer,
                seconds: 0,
                finished: true
            },
            recordModal: {
                ...state.recordModal,
                result,
                text
            }
        }))
        setTimeout(() => {
            this.showRecordModal()
        }, this.state.recordModal.showTimeout);
    }

    ///Modal
    getCorrectText(num) {
        const stringNumber = num + ''
        const lastNum = +stringNumber.slice(-1)
        if (lastNum === 0) {
            return 'символов'
        } else if (lastNum === 1) {
            return 'символ'
        } else if (lastNum >= 2 && lastNum <= 4) {
            return 'символа'
        } else if (lastNum >= 5 && lastNum <= 9) {
            return 'символов'
        }
    }

    showRecordModal = () => {
        this.setState(state => ({
            recordModal: {
                ...state.recordModal,
                isShow: true,
                nameValue: ''
            }
        }))
    }

    closeRecordModal = () => {
        this.setState(state => ({
            recordModal: {
                ...state.recordModal,
                isShow: false,
                statusSendName: '',
                nameValue: ''
            }
        }))
    }

    changeNameHandler = (e) => {
        const name = e.nativeEvent.target.value + ''
        console.log(name);
        this.clearValidateName()

        this.setState(state => ({
            recordModal: {
                ...state.recordModal,
                nameValue: name,
            }
        }))
    }

    getTime() {
        const date = new Date()
        const year = date.getFullYear() + ''
        let month = date.getMonth() + ''
        let day = date.getDate() + ''

        month = month.length === 1 ? '0' + month : month
        day = day.length === 1 ? '0' + day : day
            
        return {
            string: [day, month, year].join('-'),
            year, month, day
        }
    }

    sendResults = (name) => {
        ///TODO
        ///сделать запрос на наличие уже имеющегося sendName
        /// отправить nameValue или вызвать алерт.
        /// поставить статус невалидности
        // const date = this.getTime()

        this.setState({
            recordModal: {
                ...this.state.recordModal,
                showLoader: true,
            }
        })
        
        //success
        // setTimeout(() => {
        //     this.setState({
        //         recordModal: {
        //             ...this.state.recordModal,
        //             showLoader: false,
        //             statusSendName: 'success'
        //         }
        //     })

        //     setTimeout(() => {
        //         this.setState({
        //             recordModal: {
        //                 ...this.state.recordModal,
        //                 isShow: false,
        //                 statusSendName: ''
        //             }
        //         })
        //     }, 1000);

        // }, 800);

        //Error
        // setTimeout(() => {
        //     this.setState({
        //         recordModal: {
        //             ...this.state.recordModal,
        //             showLoader: false,
        //             statusSendName: 'error'
        //         }
        //     })

        //     setTimeout(() => {
        //         this.setState({
        //             recordModal: {
        //                 ...this.state.recordModal,
        //                 isShow: false,
        //                 statusSendName: ''
        //             }
        //         })
        //     }, 1000);

        // }, 800);
    }

    clearValidateName = () => {
        if (!this.state.recordModal.valid) {
            this.setState(state => ({
                recordModal: {
                    ...state.recordModal,
                    valid: true,
                    alert: {
                        isShowAlert: false,
                        message: ''
                    }
                }
            }))
        }
    }

    submitNameHandler = (e) => {
        const name = e.nativeEvent.target.userName.value

        if (name.length === 0) {
            const message = 'Введите имя пользователя'
            this.setState({
                recordModal: {
                    ...this.state.recordModal,
                    valid:false,
                    alert: {
                        isShowAlert: true,
                        message
                    }
                }
            })
            return
        }

        if (name.length > 18) {
            const message = `Максимальная длинна имени 18 символов, у Вас ${name.length} ${this.getCorrectText(name.length)}`
            this.setState({
                recordModal: {
                    ...this.state.recordModal,
                    valid: false,
                    alert: {
                        isShowAlert: true,
                        message
                    }
                }
            })
            return
        }

        this.clearValidateName()
        this.sendResults(name)
    }

//Area
    getWords(chars) {
        let words = []
        let lastIndex = 0

        chars.forEach((char, i, arr) => {

            if (char === ' ') {
                const sliced = chars.slice(lastIndex, i + 1)
                words.push(sliced.join(''))
                lastIndex += sliced.length

            } else if (i === arr.length - 1) {
                const sliced = chars.slice(lastIndex)
                words.push(sliced.join(''))
            }

        })
        return words
    }

    getAreaData = (e) => {
        const valueOfState = this.state.area.value
        let inputValue = e.nativeEvent.target.value
        const lastChar = inputValue.slice(-1)

        if ( (inputValue.length - valueOfState.length) > 1) {
            inputValue = valueOfState + lastChar

        } else if ( valueOfState.length > inputValue.length) {
            inputValue = valueOfState.slice(0, -1)
        }
        const indexChar = inputValue.length - 1

        this.setState(state => ({
            ...state,
            area: {
                ...state.area,
                value: inputValue,
            }
        }))
    
        return [lastChar, indexChar]
    }
    
    handleAreaInput = (e) => {
        const [lastChar, indexChar] = this.getAreaData(e)

        if (!this.state.timer.started) {
            this.startTimer()
        }
    
        const isSuccess = this.state.area.chars[indexChar] === lastChar
        const isWritten = !!(this.state.area.answeredChars[indexChar]) || indexChar < 0
        const className = isSuccess ? 'success' : 'error'
    
        if (isWritten) {
            return
        }
    
        if (className === 'success') {
            this.setState(state => ({
                ...state,
                area: {
                    ...state.area,
                    successWords: state.area.successWords + 1
                }
            }))
        }
    
        const newAnsweredChars = [...this.state.area.answeredChars]
        newAnsweredChars.push({index: indexChar, class: className})
    
        this.setState(state => ({
            ...state,
            area: {
                ...state.area,
                answeredChars: newAnsweredChars
            }
        }))
        
    }

    render() {
        return (
            <React.Fragment>
                <div className='container'>
                    <SideBar 
                        className='sideBar'
                        startedTimer={this.state.timer.started}
                        finishedTimer={this.state.timer.finished}
                        seconds={this.state.timer.seconds}
                        startTimer={this.startTimer}
                        resetTimer={this.resetTimer}
                    />

                    <TextBlock
                        startTimer={this.startTimer}
                        isDisabledArea={this.state.timer.finished}

                        changeAreaValue={this.changeAreaValue}
                        area={this.state.area}
                        handleAreaInput={this.handleAreaInput}
                    />
                </div>

                <RecordModal 
                    isShow={this.state.recordModal.isShow}
                    closeRecordModal={this.closeRecordModal}
                    result={this.state.recordModal.result}
                    text={this.state.recordModal.text}
                    sendUserName={this.sendUserName}
                    submitNameHandler={this.submitNameHandler}
                    clearValidateName={this.clearValidateName}
                    isShowAlert={this.state.recordModal.alert.isShowAlert}
                    alertMessage={this.state.recordModal.alert.message}
                    showLoader={this.state.recordModal.showLoader}
                    statusSendName={this.state.recordModal.statusSendName}
                    nameValue={this.state.recordModal.nameValue}
                    changeNameHandler={this.changeNameHandler}
                />

            </React.Fragment>
        )
    }
}

export default Main