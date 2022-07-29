import React from 'react';
import {Location} from './weather.jsx'
import ToDoList from './ToDoList.jsx';
import Notepad from './notepad.jsx'
import Clock from './clock.jsx'
import Paint from'./paint.jsx'

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            array: this.props.object,
            onOff: false,
            title: '',
            module: '',
            opacity: 0,
            display: 'none',
            noteText: JSON.parse(localStorage.notes),
            toDoText: [...JSON.parse(localStorage.toDo)],
            clockData: [...JSON.parse(localStorage.clock)],
            bgc: JSON.parse(localStorage.bgc),
            canvas: JSON.parse(localStorage.canvas),
        }
    }

    setNotepad = (data) => {
        this.setState({
            noteText: data
        }, () => {
        localStorage.setItem('notes', JSON.stringify(this.state.noteText))
        this.setState({
            module: <Notepad get={this.setNotepad} text={this.state.noteText}/>
        })
    })
}

setToDoList = (data) => {
    this.setState({
        toDoText: data
    }, () => {
    localStorage.setItem('toDo', JSON.stringify(this.state.toDoText))
    this.setState({
        module: <ToDoList get={this.setToDoList} notes={this.state.toDoText}/>
    })
})
}

setClock = (data) => {
    this.setState({
        clockData: data,
    }, () => {
    localStorage.setItem('clock', JSON.stringify(this.state.clockData))
    this.setState({
        module: <Clock get={this.setClock} clock={this.state.clockData}/>
    })
})
}

setPaint = (data) => {
    this.setState({
        bgc: data.bgc,
        canvas: data.canvas
    }, () => {
    localStorage.setItem('bgc', JSON.stringify(this.state.bgc))
    localStorage.setItem('canvas', JSON.stringify(this.state.canvas))
    this.setState({
        module: <Paint get={this.setPaint} bgc={this.state.bgc} canvas={this.state.canvas}/>
    })
})
}

    close=()=>{
        this.setState({
            opacity: 0,
        })
        setTimeout(() => {
            this.setState({
                display: 'none',
                module: false,
                    opacity: 0,
            })
        }, 100)
    }

    launch=(e)=> {
        this.setState({
            onOff: true,
            title: e.target.getAttribute('data-name'),
            display: 'flex',
        }, function() {
            if(this.state.title==="ToDoList") {
                this.setState({
                    module: <ToDoList get={this.setToDoList} notes={this.state.toDoText}/>
                })
            } else if(this.state.title==="Notepad") {
                this.setState({
                    module: <Notepad get={this.setNotepad} text={this.state.noteText}/>
                })
            } else if(this.state.title==="Clock") {
                this.setState({
                    module: <Clock get={this.setClock} clock={this.state.clockData}/>
                })
            } else if(this.state.title==="Paint") {
                this.setState({
                    module: <Paint get={this.setPaint} bgc={this.state.bgc} canvas={this.state.canvas}/>
                })
            } else {
                this.setState({
                    module: false,
                    opacity: 0,
                })
            }
            setTimeout(() => {
                this.setState({
                    opacity: 100 + "%",
                })
            }, 100);
        })
    }

    render() {
        const array = this.state.array.map((elem,index) => <div key={index} data-name={elem.text} className="application" onClick={this.launch}>
            <li className={elem.icon + " icon"}></li>
            {elem.text}
            </div>)
        return <>
                <Location/>
                    <div className="container-main">{array}</div>
                    <div id="application-container" style={{opacity: this.state.opacity, display: this.state.display}}>
                        <div id="title">
                            <h3>{this.state.title}</h3>
                            <div id="close" onClick={this.close}>X</div>
                        </div>
                        {this.state.module ===false? 'ok' : this.state.module}
                    </div>
                </>
    }
}

class DateTaskBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time: new Date()
        }
    }

    componentDidMount = () => {
        this.timeInterval = window.setInterval(() => {
            this.setState({
                time: new Date(),
                hour: this.state.time.getHours() <10 ? "0" + this.state.time.getHours(): this.state.time.getHours(),
                minute: this.state.time.getMinutes() <10 ? "0" + this.state.time.getMinutes(): this.state.time.getMinutes(),
                year: this.state.time.getFullYear(),
                month: this.state.time.getMonth() + 1 <10 ? "0" + Number(this.state.time.getMonth() + 1): Number(this.state.time.getMonth() + 1),
                day: this.state.time.getDate() <10 ? "0" + this.state.time.getDate(): this.state.time.getDate(),
            })
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timeInterval)
    }
    render() {
        return <>
                <div id="time">{this.state.hour}:{this.state.minute}</div>
                <div id="date">{this.state.day}.{this.state.month}.{this.state.year}</div>
            </>
    }
}

class Footer extends React.Component {
    render() {
        return <div>
            <div id="windows"><i className="fa-brands fa-windows"></i></div>
            <div className="app"><a href="https://github.com/LeQu15" target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></a></div>
            <div className="footer-container"><i className="fa-solid fa-wifi"></i><i className="fa-solid fa-volume-high"></i><div id="clock"><DateTaskBar/></div></div>
        </div>
    }
}

export{Main,Footer}