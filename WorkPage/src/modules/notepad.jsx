import React from 'react';

class Notepad extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            text: this.props.text,
        };
    }


    handleChange = (event) => {
        this.setState({
            text: event.target.value
        }, () => {this.props.get(this.state.text)})
    }

        render() {
    return <div id="appBox">
        <textarea value={this.state.text} onChange={this.handleChange}></textarea>
    </div>
    }
}
    export default Notepad