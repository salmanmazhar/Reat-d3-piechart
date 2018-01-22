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
        let { user, performLogout } = this.props;

        return( 
        <div> 
            <nav className="navbar navbar-light bg-light">
                <img src={icon} />
                {user.statusCode===1?
                    <span>
                        <span className="text-muted">{`Hi ${user.username}!`}</span>
                        <span>  
                            <button type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={()=>{performLogout()}}>Logout</button>
                        </span>
                    </span>:null
                }
            </nav>  

            <div className="container">    
                <div className="col-md-12">
                    { user.statusCode===1?
                        <Dashboard {...this.props} />:
                        <LoginForm {...this.props} />
                    }
                </div>
            </div>  
         </div> )
    }

} 