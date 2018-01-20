import { connect } from 'react-redux';
import Home from '../components/home';
import { login, generateRandomData } from '../actions';


const mapStateToProps = state =>{
    return {
        ...state
    }
}

const mapDispatchToProps =  dispatch =>{
    return {
        login: (data)=> dispatch(login(data))
    }
}

const HomeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

export default HomeContainer;