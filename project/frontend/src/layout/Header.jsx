import React from 'react';
import { Link} from 'react-router-dom';

import auth from "../actions/auth";
import { connect } from "react-redux";


class Header extends React.Component {

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.state = {
          currentUser: undefined
        };
      }

    componentDidMount() {
        const user = this.props.user;
        if (user) {
            this.setState({ currentUser: user });
        }
    }

    logOut = () => {
        this.props.dispatch(auth.logout());
        window.location.href = "/menuForUsers";
        // window.location.reload();
    }

    render() {
        const { user: currentUser } = this.props;
        console.log(currentUser)
        return (
            
            <nav className="navbar navbar-project navbar-expand-lg navbar-light" style={{ background: '#800000' }}>
                {currentUser ? (
                    <div className="ms-3">
                        <>
                        {(currentUser.roles).includes("ROLE_ADMIN")  && (
                            <>
                            <Link sx={{ ":hover":{bgcolor: "#1D1F1F"}}} style={{ color: 'white', fontWeight: 800 }} className="navbar-brand" to="/menu">Меню</Link>
                            <Link sx={{ ":hover":{bgcolor: "#1D1F1F"}}} style={{ color: 'white', fontWeight: 800 }} className="navbar-brand" to="/users">Пользователи</Link>
                            <Link sx={{ ":hover":{bgcolor: "#1D1F1F"}}} style={{ color: 'white', fontWeight: 800 }} className="navbar-brand" to="/products">Продукты</Link>
                            </>
                        )}
                        {(currentUser.roles).includes("ROLE_USER")  && (
                            <>
                            <Link sx={{ ":hover":{bgcolor: "#1D1F1F"}}} style={{ color: 'white', fontWeight: 800 }} className="navbar-brand" to="/menuForUsers">Меню</Link>
                            <Link sx={{ ":hover":{bgcolor: "#1D1F1F"}}} style={{ color: 'white', fontWeight: 800 }} className="navbar-brand" to="/shoppingCart">Корзина</Link>
                            </>
                        
                        )}
                        {((currentUser.roles).includes("ROLE_COOK") || (currentUser.roles).includes("ROLE_DELIVER")) && (
                            <>
                            <Link sx={{ ":hover":{bgcolor: "#1D1F1F"}}} style={{ color: 'white', fontWeight: 800 }} className="navbar-brand" to="/orders">Заказы</Link>
                            </>
                        
                        )}
                        </>
                    </div>
                ) : (
                    <Link sx={{ ":hover":{bgcolor: "#1D1F1F"}}} style={{ marginLeft:'15px', color: 'white', fontWeight: 800 }} className="navbar-brand" to="/menuForUsers">Меню</Link>
                )}  

                {currentUser ? (    
                    <div className="ml-auto">
                        {(currentUser.roles).includes("ROLE_USER")  && (
                        <Link className="navbar-brand btn" style={{ color: 'white',fontWeight: 800 }} to="/profile">Профиль</Link>
                        )}
                        <button className="navbar-brand btn" style={{ color: 'white',fontWeight: 800 }} onClick={this.logOut}>Выйти</button>
                    </div>
                ) : (
                    <div className="ml-auto">
                        <Link to="/register" style={{ color: 'white',fontWeight: 800 }} className="nav-link navbar-brand btn navbar-brand-button">Регистрация</Link>
                        <Link to="/login" style={{ color: 'white',fontWeight: 800 }} className="nav-link navbar-brand btn navbar-brand-button">Вход в систему</Link>
                    </div>
                )}
            </nav>
        );
    }
}
function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user
  };
}

export default connect(mapStateToProps)(Header);