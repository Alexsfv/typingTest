import React from 'react'
import './RecordModal.scss'
import Loader from '../UI/Loader/Loader'

class RecordModal extends React.Component {

    submitHandler = (e) => {
        e.preventDefault()
        this.props.submitNameHandler(e)
    }

    render() {
        const wrapClasses = ['modal']
        if (this.props.isShow) {
            wrapClasses.push('active')
        }

        const inputClasses = ['record-name']
        if (this.props.isShowAlert) {
            inputClasses.push('error')
        }

        const alertClasses = ['alert']
        if (this.props.isShowAlert) {
            alertClasses.push('active')
        }

        return (
            <div className={wrapClasses.join(' ')}>
                <div className="record">
                    <i className="fa fa-times close-result-btn" aria-hidden="true" onClick={this.props.closeRecordModal}/>
                    <p className="record-title">Ваша скорость печати:<br/>{this.props.result} {this.props.text}/мин</p>
                    <p className="record-title">Сохраним результат в таблицу?</p>
                    <form onSubmit={this.submitHandler}>
                        <input type="text" placeholder="Введите имя" className={inputClasses.join(' ')} onChange={this.props.changeNameHandler} name='userName' value={this.props.nameValue}/>
                        <p className={alertClasses.join(' ')}>{this.props.alertMessage}</p>
                        <input type="submit" defaultValue="Отправить" className="record-send" />
                    </form>

                    {
                        this.props.showLoader
                            ?   <Loader 
                                    classes={['mt-15']}
                                />
                            : null
                    }

                    {
                        this.props.statusSendName === 'success'
                            ? <p className='sendName-success'>Результат сохранен!<br />Не забудьте сравнить свои результаты в таблице лидеров</p>
                            : this.props.statusSendName === 'error'
                                ? <p className='sendName-error'>Произошла ошибка!</p>
                                : null
                    }
                    
                </div>
            </div>
        )
  }
}

export default RecordModal