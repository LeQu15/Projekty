import React from 'react';

class Clock extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.clock)
        this.state = {
            date: new Date(),
            pause: 'Uruchom',
            stoper: 0,
            alarm: '',
            alarmArray: [...this.props.clock.filter(elem => elem !=='')]
        };
        console.log(this.props.clock, this.props.clock.filter(elem => elem !==''))
    }

    componentDidMount = () => {
        this.clockInterval = window.setInterval(()=> {
            this.setState({
                date: new Date(),
                hour: this.state.date.getHours() <10 ? "0" + this.state.date.getHours(): this.state.date.getHours(),
                minute: this.state.date.getMinutes() <10 ? "0" + this.state.date.getMinutes(): this.state.date.getMinutes(),
                year: this.state.date.getFullYear(),
                month: this.state.date.getMonth() + 1 <10 ? "0" + Number(this.state.date.getMonth() + 1): Number(this.state.date.getMonth() + 1),
                day: this.state.date.getDate() <10 ? "0" + this.state.date.getDate(): this.state.date.getDate(),
                seconds: this.state.date.getSeconds() <10 ? "0" + this.state.date.getSeconds(): this.state.date.getSeconds(),
                currentTime: this.state.hour + ":" + this.state.minute,
            })
            if(this.state.alarmArray.includes(this.state.currentTime)) {
                this.setState({
                    alarmArray: this.state.alarmArray.filter(item => item !== this.state.currentTime)
                }, () => {this.props.get(this.state.alarmArray)})
                window.alert(`Twój alarm został włączony ${this.state.currentTime}`)
            }
        }, 100)
    }

    componentWillUnmount() {
        clearInterval(this.clockInterval)
        clearInterval(this.stoperInterval)
    }

    handleStoper = () => {
        if(this.state.pause === 'Uruchom') {
            this.setState({
                pause: 'Zatrzymaj'
            })
            this.stoperInterval = window.setInterval(() => {
                this.setState({
                    stoper: this.state.stoper + 100,
                })
            }, 100)
        } else {
            clearInterval(this.stoperInterval)
            this.setState({
                pause: 'Uruchom'
            })
        }
    }

    resetStoper = () => {
        this.setState({
            pause: 'Uruchom',
            stoper: 0
        })
        clearInterval(this.stoperInterval)
    }


    handleChangeAlarm = (e) => {
        this.setState({
            alarm: e.target.value
        })
    }

    deleteAlarm = (e) => {
        const array = this.state.alarmArray
        array.splice(e.currentTarget.getAttribute('data-index'), 1)
        this.setState({
            arrayOfTasks: array,
        }, () => {this.props.get(this.state.alarmArray)})
    }

    addAlarm = () => {
        if(this.state.alarm !== '') {
            this.setState({
                alarmArray: [...this.state.alarmArray, this.state.alarm]
            }, () => {this.props.get(this.state.alarmArray)})
        } else window.alert('Musisz podać czas')
    }

        render() {
            const array = this.state.alarmArray.sort().map((elem, index) => <div key={index}>
                <div>Alarm: {elem}</div>
                <button data-index={index} onClick={this.deleteAlarm}>Usuń</button>
            </div>)
    return <div id="appBox">
        <div id="currentTime">Czas: 
            <p>{this.state.currentTime + ":" + this.state.seconds}</p>
        </div>
        <div id="stoper">
            <p>Stoper: </p>
            {(this.state.stoper/1000).toFixed(1)}
            <div>
                <button onClick={this.handleStoper}>{this.state.pause}</button>
                <button onClick={this.resetStoper}>Reset</button>
            </div>
        </div>
        <div id="alarm">
            <p>Alarm: </p>
            <div id="addAlarm">
                <input type="time" id="appt" name="appt" min="00:00" max="23:00" value={this.state.alarm} onChange={this.handleChangeAlarm}/>
                <button onClick={this.addAlarm}>Dodaj</button>
            </div>
            <div id="alarms">{array.sort()}</div>
        </div>
    </div>
    }
}
    export default Clock