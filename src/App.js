import React, { Component } from 'react'
import * as d3 from "d3"
import LineChart from './LineChart'
import Slider from './slider'
import StateSelector from './StateSelector'
import './app.css'

// import datajson from './us.json'
import usjson from './us_2.json'
import statesjson from './states.json'

var parseDate = d3.timeParse("%Y%m%d")

for(var i = 0; i < statesjson.date.length; i++){
  statesjson.date[i] = parseDate(statesjson.date[i])
  console.log(statesjson.date[i])
}

  class App extends Component {

    constructor(){
      super();
      this.state = {
        data : statesjson,
        threshold : statesjson.date[0],
        selected : []

      }
    }

    updateThreshold = (data) => {
      this.setState({threshold : data})
    }

    updateStateSelected = (chosen) => {
      this.setState({selected: this.state.selected.concat([chosen]) })
    }


    onClearClick = () => {
      this.setState({selected: []})
    }



    render () {
      return (
        <div className = "App">
        <div>
            COVID-19 Cases Increase Over Time
            <LineChart data={this.state.data} threshold = {this.state.threshold} selected={this.state.selected} />
            <div className= 'controldiv'>
              <Slider data={this.state.data} updateToParent = {this.updateThreshold}/>
              <div className = 'rowC'>
                <StateSelector updateToParent = {this.updateStateSelected}/>
                <button type="button" onClick = {this.onClearClick}>Clear</button>
              </div>
            </div>
            <a href='https://hattywang.github.io/covidInfo.github.io/multiView.html' class="previous">previous</a>
        </div>
        </div>
      )
    }

  }


export default App;

