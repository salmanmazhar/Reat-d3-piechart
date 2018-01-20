import React from 'react';
// import 'materialize-css/dist/css/materialize.css'
// import 'materialize-css/dist/js/materialize.js'
import Dashboard from './dashboard';

export default class Home extends React.Component{
    constructor(){
        super();
    }

    render(){
        let { loggedIn, login } = this.props;

        return( 
        <div className="row"> 
            <div className="col s6 offset-s3">
                <div className="card blue-grey darken-1">
                <div className="card-action">
                { loggedIn?
                    <Dashboard {...this.props} />:
                    <a href="#" onClick={()=>{login({loggedIn:true,userName:"Salman"})}}>Login</a>
                }
                </div>
                </div>
            </div>
         </div> )
    }

} 