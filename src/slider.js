import React, {Component} from 'react'
import * as d3 from "d3"


class Slider extends Component {

  componentDidMount() {
    this.drawSlider(this.props.data, this.props.updateToParent)
  }

  drawSlider(data, updateToParent) {
    console.log("here")
    var formatDate = d3.timeFormat("%m/%d");

    // var startDate = data[0].date,
    //     endDate = data[(data.length)-1].date;
    var startDate = data.date[0],
        endDate = data.date[data.date.length-1];

    var margin = {top:0, right:50, bottom:0, left:50},
        width = 480 -margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var svg = d3.select(this.refs.slider)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height);

    var x = d3.scaleTime()
        .domain([startDate, endDate])
        .range([0, width])
        .clamp(true);

    var slider = svg.append("g")
        .attr("class", "slider")
        .attr("transform", "translate(" + margin.left + ",50)");

    slider.append("line")
        .attr("class", "track")
        .attr("x1", x.range()[0])
        .attr("x2", x.range()[1])
        .attr("stroke", "#000")
        .attr("stroke-opacity", 0.1)
        .attr("stroke-width", "10px")
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-inset")
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-overlay")
        .call(d3.drag()
            .on("start.interrupt", function() { slider.interrupt(); })
            .on("start drag", function() {
              update(x.invert(d3.event.x));
             }));

    slider.insert("g", ".track-overlay")
        .attr("class", "ticks")
        .attr("transform", "translate(0," + 18 + ")")
      .selectAll("text")
        .data(x.ticks(5))
        .enter()
        .append("text")
        .attr("x", x)
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .text(function(d) { return formatDate(d); });

    var label = slider.append("text")
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .text(formatDate(startDate))
        .attr("transform", "translate(0," + (-25) + ")")

    var handle = slider.insert("circle", ".track-overlay")
        .attr("class", "handle")
        .attr("r", 9);

    function update(h) {
      handle.attr("cx", x(h));
      label
        .attr("x", x(h))
        .text(formatDate(h));

      updateToParent(h);
    }

  }
  render() {return <div ref="slider"></div>}


}

export default Slider;
