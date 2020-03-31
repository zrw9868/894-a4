import React, {Component} from 'react'
import * as d3 from "d3"

const width = 960;
const height = 500;
const margin = {top: 50, right: 50, bottom: 100, left:50};

class LineChart extends Component {

  componentDidMount() {
    this.drawChart(this.props.data)
  }

  componentDidUpdate(){
    this.update(this.props.data, this.props.threshold, this.props.selected)
  }

  drawChart(data) {
    // ------- scale ---------//
    // let new_data = data.filter(function(d) {return d.date <
    var startDate = data.date[0],
        endDate = data.date[data.date.length-1];

    var maxi = d3.max(data.series, s => d3.max(s.positive.map(
      function(d) {
            if (d !== "undefined") {return d}
            else { return -1}
      })))
    console.log(d3.max(data.series[0].positive))
    console.log(maxi)

    var xScale = d3.scaleTime()
      .domain([startDate, endDate])
      .range([margin.left, width - margin.right]);

    var yScale = d3.scaleLinear()
      .domain ([0, maxi]).nice()
      .range([height - margin.bottom, margin.top])

    // --------- axis --------//
    const xAxis = d3.axisBottom()
      .ticks(d3.timeDay.every(1))
      .tickFormat(d3.timeFormat('%m/%d'))
      .scale(xScale);

    this.yAxis = d3.axisLeft()
      .ticks(10)
      .scale(yScale);

    // ------- draw --------//
    this.svg = d3.select(this.refs.chart)
      .append("svg")
      .attr('width', width )
      .attr('height', height )

    this.svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis);

    this.y_axis = this.svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(this.yAxis)


    this.chart = this.svg.append("g")


    }

    update(data, threshold, selected){
      // let new_data = data.filter(function(d) {return d.date <
      console.log(selected)
      var index = data.date.findIndex(function(d) {return d.getDate() === threshold.getDate()});
      var tp_data = data.series.filter(d => {return selected.includes(d.name)})

      var new_data = tp_data.map(d => { return {
        name: d.name,
        positive: d.positive.slice(0,index)
        }
      })
      console.log(new_data)

      var startDate = data.date[0],
          endDate = data.date[data.date.length-1];

      var maxi = d3.max(tp_data, s => d3.max(s.positive.map(
        function(d) {
              if (d !== "undefined") {return d}
              else { return -1}
        })))

      var xScale = d3.scaleTime()
        .domain([startDate, endDate])
        .range([margin.left, width - margin.right]);

      var yScale = d3.scaleLinear()
        .domain ([0, maxi]).nice()
        .range([height - margin.bottom, margin.top])

      this.yAxis.scale(yScale);

      this.y_axis.call(this.yAxis);

      var color = d3.scaleOrdinal(d3.schemeTableau10).domain(new_data.map(d => d.name));

      var line = d3.line()
        .defined(d => d !== "undefined")
        .x((d,i) => xScale(data.date[i]))
        .y(d => yScale(d))

      this.chart.selectAll("path")
        .data(new_data)
          .join("path")
            .attr("stroke-width", 2)
            .attr("stroke", (d)=> color(d.name))
            .attr("fill", "none")
            .attr("d", d=>line(d.positive))

      this.chart.selectAll("text")
        .data(new_data)
          .join("text")
          .attr("x", xScale(endDate))  // space legend
          .attr("y", (d,i) => margin.top + i*15)
          .attr("class", "legend")    // style the legend
          .style("fill", (d) => color(d.name))
          .text(d => d.name);
        }


  render() {return <div ref="chart"></div>}
}


export default LineChart;
