/**********************************************************************
A custom chart implemented using D3. Beyond this component D3 is used
for DOM manipulation. The component is kept almost stateless and can
be replaced by any other highlevel chart component if needed. 
**********************************************************************/
import React from 'react'
import * as d3 from "d3"

export default class PieChart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          svg : null
        }
      }

    shouldComponentUpdate() { return false; }


    renderPieChart(dataprops) {
        let {data,
             width,
             height} = dataprops,
             radius = Math.min(width, (height)) / 2;

        let color = d3.scaleOrdinal()
            .range(["#F22F41", "#273446", "#779FD6","#FFB344"]);

        let arc = d3.arc()
            .outerRadius(radius-10)
            .innerRadius(0);
        
        let pie = d3.pie()
            .sort(null)
            .value((d)=> { return d.value; });

        //clear previous groups in case an update occurs    
        this.state.svg.selectAll("g").remove();

        //Rendering pie chart element
        let pieGroup = this.state.svg
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", `translate( ${(width / 2)},${height / 2} )`);


        let g = pieGroup.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc");
              
          g.append("path")
              .attr("d", arc)
              .style("fill", (d) => { return color(d.value); })

          //Rendering legend element
          let legendGroup = this.state.svg
          .append("g")
          .attr("transform", `translate(${(width/2)+radius},${0})`);    

          let legend = legendGroup.selectAll(".legend")
          .data(pie(data))
          .enter().append("g")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 50)
          .attr("height", 20)
          .attr("transform", (d,i)=>{return `translate(0,${i*30})`});
          
          legend.append('rect')
          .attr("width",height/20)
          .attr("height",height/20)
          .attr("x",10)
          .attr("y",10)
          .style("fill", function (d, i) {
            return color(i)
            });

            legend.append('text')
            .attr("x",35)
            .attr("y",25)
            .text((d)=>{
              return `${d.data.key.toLowerCase()}: ${d.value}`
            })
            .style("font-size",14);

      }

      componentWillReceiveProps(nextProps) {

        if (nextProps !== this.props && 
          this.state.svg!==null) {
            this.setState({ svg: d3.select(this.refs.svg)})
            this.renderPieChart(nextProps);
        }
      }

      componentDidMount(){
        this.setState({ svg: d3.select(this.refs.svg) });
      }

      onRef = (ref) => {
        this.setState({ svg: d3.select(ref) })
      }

      render() {
        const { title } = this.props;
        return (
          <div>
            <h4 className="text-center text-white font-weight-light">{title}</h4>
            <svg ref="svg"></svg>
          </div>
        )
      }
}   
