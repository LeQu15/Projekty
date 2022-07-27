import React from 'react';

class Notepad extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.text)
        this.state = {
            text: this.props.text
        };
    }


    handleChange = (event) => {
        this.setState({
            text: event.target.value
        }, () => {this.props.get(this.state.text)})
    }

        render() {
    return <div id="appBox">
        <div id="notes"><textarea value={this.state.text} onChange={this.handleChange}></textarea></div>
    </div>
    }
}
    export default Notepad