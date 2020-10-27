import device from 'current-device'
import {sendMobibleUser, sendDesktopUser} from '../../database'

import {
    MAIN_SUBTRACT_TIMER,
    MAIN_START_TIMER,
    MAIN_RESET_TIMER,
    MAIN_STOP_TEST,
    MAIN_SHOW_RECORD_MODAL,
    MAIN_CLOSE_RECORD_MODAL,
    MAIN_CHANGE_NAME,
    MAIN_SHOW_LOADER,
    MAIN_SUCCESS_SEND_USER,
    MAIN_SUCCESS_CLOSE_RECORD,
    MAIN_ERROR_SEND_USER,
    MAIN_CLEAR_ERROR_SEND_USER,
    MAIN_CLEAR_VALIDATE_NAME_FIELD,
    MAIN_INVALID_NAME,
    MAIN_REWRITE_AREA,
    MAIN_PLUS_COUNTER_SUCCESS_CHARS,
    MAIN_ADD_ANSWERED_CHAR
} from './actionTypes'



export function subtractTimer() {
    return (dispatch, getState) => {
        dispatch({
            type: MAIN_SUBTRACT_TIMER,
            seconds: getState().main.timer.seconds - 1
        })
    }
}

export function toStartTimer(timerId) {
    return {
        type: MAIN_START_TIMER,
        intervalId: timerId
    }
}

export function resetTimer() {
    return (dispatch, getState) => {
        dispatch({
            type: MAIN_RESET_TIMER,
            seconds: getState().main.timer.maxSeconds,
        })
    }
}

export function endTest(result, text) {
    return {
        type: MAIN_STOP_TEST,
        result, text
    }
}

export function showRecordModal() {
    return {
        type: MAIN_SHOW_RECORD_MODAL,
    }
}

export function closeRecordModal() {
    return {
        type: MAIN_CLOSE_RECORD_MODAL
    }
}

export function changeName(name) {
    return {
        type: MAIN_CHANGE_NAME,
        name
    }
}

export function showLoader() {
    return {
        type: MAIN_SHOW_LOADER
    }
}

export function sendUser(user) {
    return async (dispatch, getState) => {
        const delay = getState().main.recordModal.hideTimeout
        try {
            device.type === 'mobile'
                ? await sendMobibleUser(user)
                : await sendDesktopUser(user)
            
            dispatch(successSendUser())
   
            setTimeout(() => {
                dispatch(successCloseRecord())
            }, delay * 2);

        } catch(e) {
            console.log(e)
            dispatch(errorSendUser())

            setTimeout(() => {
                dispatch(clearErrorSendUser())
            }, delay);
        }
    }
}

export function clearValidateNameField() {
    return {
        type: MAIN_CLEAR_VALIDATE_NAME_FIELD,
    }
}

export function invalidName(message) {
    return {
        type: MAIN_INVALID_NAME,
        message
    }
}

export function rewriteArea(value) {
    return {
        type: MAIN_REWRITE_AREA,
        value
    }
}

export function plusCounertSuccessChars() {
    return (dispatch, getState) => {
        dispatch({
            type: MAIN_PLUS_COUNTER_SUCCESS_CHARS,
            successChars: getState().main.area.successChars + 1
        })
    }
}

export function addAnsweredChar(newChars) {
    return {
        type: MAIN_ADD_ANSWERED_CHAR,
        newChars
    }
}


function successSendUser() {
    return {
        type: MAIN_SUCCESS_SEND_USER
    }
}

function successCloseRecord() {
    return {
        type: MAIN_SUCCESS_CLOSE_RECORD
    }
}

function errorSendUser() {
    return {
        type: MAIN_ERROR_SEND_USER
    }
}

function clearErrorSendUser() {
    return {
        type: MAIN_CLEAR_ERROR_SEND_USER
    }
}