import React from 'react'
import Dashboard from './dashboard'
import LoginForm from './loginForm'
import 'bootstrap/dist/css/bootstrap.min.css'
import icon from '../icon.png'

export default class Home extends React.Component{
    constructor(){
        super();
    }

    render(){
        let { login, loggedIn, username } = this.props;

        return( 
        <div> 

            <nav className="navbar navbar-light bg-light">
                <img src={icon} />
                <span className="text-muted">{username&&loggedIn?`Hi ${username}!`:""}</span>
                <span>
                {loggedIn?    
                <button type="button"
                className="btn btn-secondary btn-sm"
                onClick={()=>{login("",false)}}>Logout</button>:null
                }
                </span>

            </nav>  
            <div className="container">    
            <div className="col-md-12">
                { loggedIn?
                    <Dashboard {...this.props} />:
                    <LoginForm {...this.props} />
                }
            </div>
            </div>  
         </div> )
    }

} 