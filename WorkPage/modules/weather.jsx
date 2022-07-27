import React from 'react';
    
class Location extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userLocation: false,
        }
    }
    componentDidMount() {
        fetch("https://json.geoiplookup.io/")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              userLocation: result.country_name
            })
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
    render() {
        if(this.state.userLocation) return <Weather userLocation = {this.state.userLocation}/>
        else return null
    }
}
class Weather extends React.Component {
        constructor(props) {
            super(props)
            const date = new Date()
            this.state = {
                userLocation: this.props.userLocation,
                hour: date.getHours(),
                temp: 0,
            }
        }

        componentDidMount() {
            fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+this.state.userLocation+"?unitGroup=metric&key=522VLJBXMFTG3QPE4MXXL7BLC&contentType=json")
              .then(res => res.json())
              .then(
                (result) => {
                    this.setState({
                        temp: result.days[0].hours[this.state.hour].temp + '\u2103',
                        icon: "./img/weather/" + result.days[0].hours[this.state.hour].icon+".png"
                    })
                },
                (error) => {
                  this.setState({
                    isLoaded: true,
                    error
                  });
                }
              )
        }

        render() {
    return <div className = "weather"><img src={this.state.icon}/><p>{this.state.temp}</p></div>
    }
}
    export {Location,Weather}