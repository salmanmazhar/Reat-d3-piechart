import React from 'react'
import PieChart from './pieChart'

export default class Dashboard extends React.Component{
    constructor(){
        super();
    }

    render(){
                
        return(<div>
            <div>
                <PieChart width={450} height={250}
                outerRadius={100} innerRadius={50}
                data={this.props.data}
                />
            </div>    
        </div>)

    }

}