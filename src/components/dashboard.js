/**********************************************************************
A container component for rendering charts, charts from different
libraries can be simultaneously rendered using same datasource. However
for this task, a custom pieChart component was developed.
This component is responsible for responsivness of the children charts
**********************************************************************/
import React from 'react'
import PieChart from './pieChart'
import ReactDOM from 'react-dom'

export default class Dashboard extends React.Component{
    constructor(){
        super();
        this.state= {
            width:600,
            height:300
        };
    }

    componentWillMount(){
        this.props.fetchAllUsers();
    }
    calculateChartWidth(){
        var chartContainer = ReactDOM.findDOMNode(this.refs.container);
        if(chartContainer){
            var dimensions = chartContainer.getBoundingClientRect();
            if(dimensions.width){
                this.setState({width:dimensions.width,
                    height:dimensions.width/2})
            }
        }
    }

    componentDidMount(){
        this.calculateChartWidth();
        window.addEventListener("resize", this.calculateChartWidth.bind(this));
    }

    render(){
       const { genderGroups } = this.props;

        return(<div>
            <div className="col-sm-10 offset-sm-1 card bg-secondary mb-3"
            style={{marginTop:"50px",padding:"25px"}}>
                <div ref="container">
                <PieChart width={this.state.width}
                 height={this.state.height}
                 title={"Gender distribution of Newyorker users"}
                 data={genderGroups}
                />
                </div>
            </div>    
        </div>)

    }

}