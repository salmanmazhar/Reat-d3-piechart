import { connect } from 'react-redux';
import Home from '../components/home';
import {performLogin,
    login,
    generateRandomData } from '../actions';


const mapStateToProps = state =>{
    return {
        ...state
    }
}

const mapDispatchToProps =  dispatch =>{
    return {
        login: (username,status) => dispatch(login(username,status)),
        performLogin: (username,password)=> dispatch(performLogin(username,password))
    }
}

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

export default HomeContainer;