import React from 'react';


class ToDoList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            items: this.props.items,
            arrayOfTasks: []
        };
    }

        render() {
    return <div id="appBox">
        <div id="tasks">Jutro to zrobię + paint i zegar, już wiem wszystko co i jak więc szybciej będzie</div>
        <div id="addTask">
            <input className="todolist" type="text" placeholder="Wpisz zadanie"></input>
            <button onClick={this.addNewTask}>Dodaj</button>
        </div>
    </div>
    }
}
    export default ToDoList