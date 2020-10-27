import React from 'react'
import SideBar from '../Components/SideBar/SideBar'
import '../Components/Layout/container.scss'
import TextBlock from '../Components/TextBlock/TextBlock'
import RecordModal from '../Components/RecordModal/RecordModal'
import {getMobileUser, getDesktopUser} from '../database'
import {connect} from 'react-redux'
import { resetTimer, subtractTimer, 
        toStartTimer, endTest, 
        showRecordModal, closeRecordModal, 
        changeName, showLoader, 
        sendUser, clearValidateNameField,
        invalidName, rewriteArea,
        plusCounertSuccessChars, addAnsweredChar } from '../store/actions/main'


class Main extends React.Component {

    startTimer = () => {
        if (!this.props.timer.finished) {
            const delay = 1000
            
            const timerId = setInterval(() => {

                if (this.props.timer.seconds <= 1 && this.props.timer.seconds > 0) {
                    this.stopTest(1)
                    return
                }
    
                this.props.subtractTimer()
            }, delay); 

            this.props.toStartTimer(timerId)
        }
    }

    resetTimer = () => {
        clearInterval(this.props.timer.intervalId)
        this.props.resetTimer()
    }

    stopTest = (delaySeconds = 0) => {
        const perSecond = this.props.area.successChars / (this.props.timer.maxSeconds - this.props.timer.seconds + delaySeconds)
        const result = Math.round(perSecond * 60)
        const text = this.getCorrectText(result)

        clearInterval(this.props.timer.intervalId)

        this.props.endTest(result, text)

        setTimeout(() => {
            this.props.showRecordModal()
        }, this.props.recordModal.showTimeout);
    }

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

    changeNameHandler = (e) => {
        const name = e.nativeEvent.target.value + ''
        this.clearValidateName()

        this.props.changeName(name)
    }

    getTime() {
        const date = new Date()
        const year = date.getFullYear() + ''
        let month = date.getMonth() + 1 + ''
        let day = date.getDate() + ''

        month = month.length === 1 ? '0' + month : month
        day = day.length === 1 ? '0' + day : day
            
        return {
            string: [day, month, year].join('-'),
            year, month, day
        }
    }

    hasSameUserName = async (name) => {
        this.props.showLoader()

        const mobileUser = await getMobileUser(name)
        const desktopUser = await getDesktopUser(name)
        return (mobileUser === null && desktopUser === null) ? false : true
    }

    sendResults = name => {
        const date = this.getTime()
        const user = {
            name,
            points: this.props.recordModal.result,
            date,
        }      

        this.props.sendUser(user)
    }

    clearValidateName = (forceClean) => {
        if (!this.props.recordModal.valid || forceClean) {
            this.props.clearValidateNameField()
        }
    }

    submitNameHandler = async (e) => {
        const name = e.nativeEvent.target.userName.value.trim()
        const depricatedChars = name.split(/[a-zA-ZА-ЯЁа-яё]+|\d+|\s+/g).join('')

        let message
        let valid = true

        if (name.length === 0) {
            message = 'Введите имя пользователя'
            valid = false

        } else if (name.length > 18) {
            message = `Максимальная длинна имени 18 символов, у Вас ${name.length} ${this.getCorrectText(name.length)}`
            valid = false

        } else if (depricatedChars.length > 0) {
            message = 'Используйте только буквы, цифры и пробел!'
            valid = false

        } else if (await this.hasSameUserName(name)) {
            message = 'Это имя уже занято'
            valid = false
        }
        
        if (valid === true) {          
            this.clearValidateName(true)
            this.sendResults(name)
        }

        if (valid === false) {
            this.props.invalidName(message)
        }   
    }

    getAreaData = (e) => {
        const valueOfState = this.props.area.value
        let inputValue = e.nativeEvent.target.value
        const lastChar = inputValue.slice(-1)

        if ( (inputValue.length - valueOfState.length) > 1) {
            inputValue = valueOfState + lastChar

        } else if ( valueOfState.length > inputValue.length) {
            inputValue = valueOfState.slice(0, -1)
        }
        const indexChar = inputValue.length - 1

        this.props.rewriteArea(inputValue)
        return [lastChar, indexChar]
    }
    
    handleAreaInput = (e) => {
        const [lastChar, indexChar] = this.getAreaData(e)
        const isWrittenAll = indexChar >= this.props.area.chars.length - 1

        if (!this.props.timer.started) {
            this.startTimer()
        }

        const isSuccess = this.props.area.chars[indexChar] === lastChar
        const isWritten = !!(this.props.area.answeredChars[indexChar]) || indexChar < 0
        const className = isSuccess ? 'success' : 'error'
    
        if (isWritten) {
            return
        }
    
        if (className === 'success') {
            this.props.plusCounertSuccessChars()
        }
    
        const newAnsweredChars = [...this.props.area.answeredChars]
        newAnsweredChars.push({index: indexChar, class: className})
    
        this.props.addAnsweredChar(newAnsweredChars)

        if (isWrittenAll) {
            this.stopTest()
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className='container'>
                    <SideBar 
                        className='sideBar'
                        startedTimer={this.props.timer.started}
                        finishedTimer={this.props.timer.finished}
                        seconds={this.props.timer.seconds}
                        startTimer={this.startTimer}
                        resetTimer={this.resetTimer}
                    />

                    <TextBlock
                        startTimer={this.startTimer}
                        isDisabledArea={this.props.timer.finished}

                        changeAreaValue={this.changeAreaValue}
                        area={this.props.area}
                        handleAreaInput={this.handleAreaInput}
                    />
                </div>

                <RecordModal 
                    isShow={this.props.recordModal.isShow}
                    closeRecordModal={this.props.closeRecordModal}
                    result={this.props.recordModal.result}
                    text={this.props.recordModal.text}
                    sendUserName={this.sendUserName}
                    submitNameHandler={this.submitNameHandler}
                    clearValidateName={this.clearValidateName}
                    isShowAlert={this.props.recordModal.alert.isShowAlert}
                    alertMessage={this.props.recordModal.alert.message}
                    showLoader={this.props.recordModal.showLoader}
                    statusSendName={this.props.recordModal.statusSendName}
                    nameValue={this.props.recordModal.nameValue}
                    changeNameHandler={this.changeNameHandler}
                />

            </React.Fragment>
        )
    }
}

function mapStateToProps(state) {
    return {
        timer: state.main.timer,
        area: state.main.area,
        recordModal: state.main.recordModal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        subtractTimer: () => dispatch(subtractTimer()),
        toStartTimer: timerId => dispatch(toStartTimer(timerId)),
        resetTimer: () => dispatch(resetTimer()),
        endTest: (result, text) => dispatch(endTest(result, text)),
        showRecordModal: () => dispatch(showRecordModal()),
        closeRecordModal: () => dispatch(closeRecordModal()),
        changeName: name => dispatch(changeName(name)),
        showLoader: () => dispatch(showLoader()),
        sendUser: user => dispatch(sendUser(user)),
        clearValidateNameField: () => dispatch(clearValidateNameField()),
        invalidName: message => dispatch(invalidName(message)),
        rewriteArea: value => dispatch(rewriteArea(value)),
        plusCounertSuccessChars: () => dispatch(plusCounertSuccessChars()),
        addAnsweredChar: newChars => dispatch(addAnsweredChar(newChars))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)

