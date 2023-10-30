import React from 'react';
import { Navigate } from 'react-router-dom';

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

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      successful: undefined
    };
  }

  onChangeUsername(e) {
    this.setState({username: e.target.value});
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({successful: false});
    const { dispatch } = this.props;

    dispatch(
        auth.register(this.state.username, this.state.password)
    )
        .then(() => {
          this.setState({successful: true});
          // Авторизация прошла успешно, переходим к странице входа в систему
          window.location.reload();
        })
        .catch(() => {
          this.setState({successful: false });
        });
  }

  render() {
    const { isRegistered, message } = this.props;

    if (isRegistered) {
      return <Navigate to="/login" />;
    }
    return (
        <div style={{ position: "absolute",
        top: '30%', left: '50%', transform: 'translate(-50%, -30%)', width: 400,}} className="col-md-5">
          <Box
                    sx={{
                    // ml: '20px',
                    // paddingLeft: '10px',
                    // width: '100%',
                    // maxWidth: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    borderRadius: 1,
                    mt: '5px',
                    }}>
          <form onSubmit={this.handleRegister}>
            <div className="form-group mt-2">
              <input type="text" className="form-control" name="username" placeholder="Логин" value={this.state.username} onChange={this.onChangeUsername} required/>
            </div>
            <div className="form-group mt-2">
              <input type="password" className="form-control" name="password" placeholder="Пароль" value={this.state.password} onChange={this.onChangePassword} required/>
            </div>
            <div className="form-group mt-2">
            <Button type='submit' sx={{":hover":{bgcolor: "#1D1F1F"},bgcolor: "#474949",color:'white'}} style={{marginLeft:'30%', marginBottom: '10px'}} className="btn btn-primary btn-block">Зарегистрировать</Button>
            </div>
            {message && this.state.successful !== undefined && (
                <div className="form-group">
                  <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                    {message}
                  </div>
                </div>
            )}
          </form>
          </Box>
        </div>
    )}
}

function mapStateToProps(state) {
  const { isRegistered } = state.auth;
  const { message } = state.message;
  return {
    isRegistered,
    message
  };
}

export default connect(mapStateToProps)(Register);