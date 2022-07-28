import React from 'react';


class ToDoList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            arrayOfTasks: [...this.props.notes.filter(elem => elem !=='')],
            task: '',
            error: 'none'
        };
    }

    handleTaskChange = (e) => {
        this.setState({
            task: e.target.value
        })
    }

    addNewTask = () => {
        if(this.state.task !== '') {
        this.setState({
            arrayOfTasks: [...this.state.arrayOfTasks, this.state.task],
            error: 'none'
        }, () => {this.props.get(this.state.arrayOfTasks)})
    } else this.setState({
        error: 'block'
    })
    }

    removeTask = (e) => {
        const array = this.state.arrayOfTasks
        array.splice(e.currentTarget.getAttribute('data-index'), 1)
        this.setState({
            arrayOfTasks: array,
            error: 'none'
        }, () => {this.props.get(this.state.arrayOfTasks)})
    }

        render() {
            console.log(this.state.arrayOfTasks)
            const array = this.state.arrayOfTasks.map((e, i) => <div key={i}><div>{e}</div><button onClick={this.removeTask} data-index={i}><i className="fa-solid fa-check"></i></button></div>)
    return <div id="appBox">
        <div id="tasks"><div>{array}</div></div>
        <div id="addTask">
            <p className="error" style={{display: this.state.error}}>Musisz wpisać wartość</p>
            <input className="todolist" type="text" placeholder="Wpisz zadanie" value={this.state.task} onChange={this.handleTaskChange}></input>
            <button onClick={this.addNewTask}>Dodaj</button>
        </div>
    </div>
    }
}
    export default ToDoList