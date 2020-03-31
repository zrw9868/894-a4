import React, {Component} from 'react'
import * as d3 from "d3"
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';


class StateSelector extends Component {
  constructor(props){
    super(props);
    this.state = {
      country: "United States", region:""
    }
  }

  selectRegion(val) {
    this.setState({region: val})
    this.props.updateToParent(val)
  }

  render () {
    const {country, region} = this.state;
    return (
      <div>
        <RegionDropdown
          country={this.state.country}
          value = {region}
          labelType="short"
          valueType="short"
          onChange = {(val) => {
            console.log(val)
            this.selectRegion(val)}
          }/>
      </div>
    )

  }
}
export default StateSelector;
