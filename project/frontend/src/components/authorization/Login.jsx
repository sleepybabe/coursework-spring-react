import React from 'react';
import { Navigate, Link } from 'react-router-dom';

import { connect } from "react-redux";
import auth from "../../actions/auth";

import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
  Button,
  Typography
} from "@mui/material";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: undefined
    };
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({ loading: true });

    const { dispatch } = this.props;

    dispatch(auth.login(this.state.username, this.state.password))
        .then(() => {
          window.location.reload();
        })
        .catch(() => {
          this.setState({ loading: false });
        });
  }

  render() {
    const { isLoggedIn, message } = this.props;

    if (isLoggedIn) {
      return <Navigate to="/profile" />;
    }

    return (
        <div className="col-md-5">
          <div className="col-sm-5" style={{ position: "absolute",
            top: '30%', left: '50%', transform: 'translate(-50%, -30%)', width: 400,}}>
                <Box
                    sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    borderRadius: 1,
                    mt: '5px',
                    }}>
          <form onSubmit={this.handleLogin} >
            <div className="form-group mt-2">
              <input type="text" className="form-control" name="username" placeholder="Логин" value={this.state.username} onChange={this.onChangeUsername} required/>
            </div>
            <div className="form-group mt-2">
              <input type="password" className="form-control" name="password" placeholder="Пароль" value={this.state.password} onChange={this.onChangePassword} required/>
            </div>

            <div className="form-group mt-2">
              <Button type='submit'sx={{":hover":{bgcolor: "#1D1F1F"},bgcolor: "#474949",color:'white'}} style={{marginLeft:'40%', width:'100px'}}className="btn btn-primary btn-block" disabled={this.state.loading} >
                {this.state.loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Войти</span>
              </Button>
            </div>
            <div style={{marginLeft:'35%', width:'100px'}} className="form-group mt-2">
              <Link to={`/register`}>
                Зарегистрироваться
              </Link>
            </div>
            {message && this.state.loading !== undefined && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
            )}
          </form>
          </Box>
        </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(Login);