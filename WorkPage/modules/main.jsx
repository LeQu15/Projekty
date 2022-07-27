import React from 'react';
import ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import "../style/main.scss";
import apps from "../data/apps.js";
import Animation from './animation.jsx';
import {Location} from './weather.jsx'
import ToDoList from './ToDoList.jsx';
import Notepad from './notepad.jsx'

const rootHeader = ReactDOMClient.createRoot(document.querySelector('header'))
const rootMain = ReactDOMClient.createRoot(document.querySelector('main'))
const rootFooter = ReactDOMClient.createRoot(document.querySelector('footer'))
const rootAnimation = ReactDOMClient.createRoot(document.querySelector('#animation'))

if(!localStorage.notes) localStorage.setItem('notes', JSON.stringify(''))

class Header extends React.Component {
    render() {
        return <div id="header-container">
                <div className="line"></div>
                <div className="title">
                    <h1>WorkPage</h1>
                    <i className="fa-solid fa-suitcase"></i>
                </div>
                <Location/>
                <div className="line"></div>
            </div>
    }
}

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            array: this.props.object,
            onOff: false,
            title: '',
            module: '',
            opacity: 100 +"%",
            noteText: JSON.parse(localStorage.notes)
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
} )
    }

    close=()=>{
        this.setState({
            opacity: 0
        })
        setTimeout(() => {
            this.setState({
                onOff: false,
                opacity: 200 + "%"
            })
        }, 100);
    }

    launch=(e)=> {
        this.setState({
            onOff: true,
            title: e.target.getAttribute('data-name'),
        }, function() {
            if(this.state.title=="ToDoList") {
                this.setState({
                    module: <ToDoList/>
                })
            } else if(this.state.title=="Notepad") {
                this.setState({
                    module: <Notepad get={this.setNotepad} text={this.state.noteText}/>
                })
            } else {
                this.setState({
                    module: false
                })
            }
        })
    }

    render() {
        const array = this.state.array.map((elem,index) => <div key={index} data-name={elem.text} className="application" onClick={this.launch}><li className={elem.icon + " icon"}></li>{elem.text}</div>)
        if(this.state.onOff == false) return <div className="container-main">{array}</div>
        else 
        return <div id="background" style={{opacity: this.state.opacity}}>
            <div id="application-container">
                <h3>{this.state.title}</h3>
                {this.state.module ==false? 'ok' : this.state.module}
            </div>
            <div id="close" onClick={this.close}>X</div>
        </div>
    }
}

class Footer extends React.Component {
    render() {
        return <div>
            <div className="line"></div>
            <div className="themes">
                <button id ="light"></button>
                <button id ="dark"></button>
                <button id="contrast"></button>
                </div>
            <a href="https://github.com/LeQu15" target="_blank"><i className="fa-brands fa-github"></i></a>
            <div className="line"></div>
        </div>
    }
}

rootAnimation.render(<Animation/>)
rootHeader.render(<Header/>)
rootMain.render(<Main object = {apps}/>)
rootFooter.render(<Footer/>)
