import React from 'react';
    class Animation extends React.Component {
        constructor(props) {
            super(props)
            this.state = {
                password: 'password',
                logIn: false,
            }
        }

        handleChange = (e) => {
            this.setState({
                password: e.target.value
            })
        }

        login = () => {
            this.setState({
                logIn: true
            })
        }

        render() {
            if(this.state.logIn == false){
            return <div className ="container-animation">
                    <div className="profile">
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <h2 >User</h2>
                    <div>
                    <input onChange={this.handleChange} maxLength="22" type="password" value={this.state.password} placeholder="Password"></input><i onClick={this.login} className="fa-solid fa-arrow-right-to-bracket"></i>
                    </div>
                </div>
            } else {
                setTimeout(() => {
                    document.querySelector('#animation').style.opacity = "0"
                    document.querySelector('#animation').addEventListener('transitionend', function() {
                        document.querySelector('#animation').remove()
                    })
                }, 3000);
                return <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            }
    } 
    }

    export default Animation