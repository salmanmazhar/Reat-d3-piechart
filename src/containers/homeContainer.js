import { connect } from 'react-redux';
import Home from '../components/home';
import {performLogin,
        performLogout,
        fetchAllUsers
     } from '../actions';


const mapStateToProps = state =>{
    return {
        ...state
    }
}

const mapDispatchToProps =  dispatch =>{
    return {
        performLogin: (username,password)=> dispatch(performLogin(username,password)),
        performLogout: ()=> dispatch(performLogout()),
        fetchAllUsers:()=> dispatch(fetchAllUsers())
    }
}

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

export default HomeContainer;