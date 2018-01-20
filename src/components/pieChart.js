import React from 'react'
import * as d3 from "d3"

export default class PieChart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          svg : null
        }
      }

      render() {
        return (
           <h1>Container for pie chart to be rendered here</h1>
        )
      }
}
