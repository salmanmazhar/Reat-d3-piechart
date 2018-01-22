/**********************************************************************
Component for showing login form
**********************************************************************/
import React from 'react';
import {loading} from '../images/loading.gif';
export default class LoginForm extends React.Component{
    constructor(){
        super();
        this.state = {
            emailAddress:"",
            password:""
        }
    }

    render(){
        const { user,performLogin } = this.props;

        return (
            <div className="row">
                <div className="col-md-6 offset-md-6" style={{marginTop:"5em"}}>
                    <div className="card text-white bg-secondary mb-3">
                        <div className="card-header">Login
                        {user.statusCode===3?
                            <img src={loading}/>:null
                        }
                        </div>
                        <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="ny-email">Email address</label>
                            <input type="email"
                             className="form-control"
                             id="ny-email"
                             placeholder="Enter email"
                             value={this.state.emailAddress}
                             onChange={(e)=>{this.setState({emailAddress:e.target.value})}}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="ny-password">Password</label>
                            <input type="password"
                             className="form-control"
                             id="ny-password"
                             placeholder="Password"
                             value={this.state.password}
                             onChange={(e)=>{this.setState({password:e.target.value})}}/>
                        </div>
                        {user.statusCode===2?
                            <p className="bg-danger text-white font-weight-light" 
                            style={{fontSize:"9pt",
                            borderRadius: "0.2em",
                            padding:"0.2em",
                            marginBottom:"0.2em"
                             }}>
                            Opps! We are unable to login, Please make sure you have the correct user name and password
                            </p>:null
                        }
                        <button type="submit"
                            className="btn btn-dark"
                            onClick={()=>{performLogin(this.state.emailAddress,this.state.password)}}>Login</button>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}