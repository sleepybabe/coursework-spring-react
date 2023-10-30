import React from 'react';

import http from "../http-common";

import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";

import {
    Box,
    Button
  } from "@mui/material";

class AddUser extends React.Component {
    constructor() {
        super();

        this.state = {
            username: "",
            name: "",
            phone: "",
            address: "",
            role: 'ROLE_USER',
            password: "",
            submitted : false,
            

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event, changed) {
        this.setState({[changed]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        var data = {
            username: this.state.username,
            name: this.state.name,
            phone: this.state.phone,
            address:this.state.address,
            role: this.state.role,
            password:this.state.password,

        };
        if(data.password==="" || data.username==="" || data.role===""){
            this.setState({notvalid: true})
            return 
        }

        http
            .post("/users", data)
            .then(() => {
                this.setState({submitted: true});
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        if (this.state.submitted) {
            return <Navigate to="/users" />;
        }
        const roles = ["ROLE_USER","ROLE_ADMIN","ROLE_DELIVER","ROLE_COOK"]
        return (
            <div className="col-sm-5" style={{ position: "absolute",
            top: '30%', left: '50%', transform: 'translate(-50%, -30%)', width: 400,}}>
                <Box
                    sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    borderRadius: 1,
                    mt: '5px',
                    }}>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group mb-3">
                        <input type="text" name="name" value={this.state.name} placeholder="Имя" onChange={(event)=>this.handleChange(event, "name")} className="form-control"/>
                    </div>
                    <div className="form-group mb-3">
                        <input type="text" name="username" value={this.state.username} placeholder="Логин" onChange={(event)=>this.handleChange(event, "username")} className="form-control"/>
                    </div>
                    <div className="form-group mb-3">
                        <input type="password" name="password" value={this.state.password} placeholder="Пароль" onChange={(event)=>this.handleChange(event, "password")} className="form-control"/>
                    </div>
                    <div className="form-group mb-3">
                        <input type="text" name="phone" value={this.state.phone} placeholder="Телефон" onChange={(event)=>this.handleChange(event, "phone")}className="form-control"/>
                    </div>
                    <div className="form-group mb-3">
                        <input type="text" name="address" value={this.state.address} placeholder="Адрес"onChange={(event)=>this.handleChange(event, "address")} className="form-control"/>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="role">Выберите роль:</label>
                        <select name="role"  value={this.state.role} onChange={(event)=>this.handleChange(event, "role")}className="form-control">
                            {roles.map((role, i) => (
                                <option key={i} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>
                    <Button  variant="contained"sx={{":hover":{bgcolor: "#1D1F1F"},bgcolor: "#474949",
                            mt: '-10px', mb: '10px', ml:'150px'}}  type="submit">
                           Добавить
                    </Button>

                   
                </form>
               
                </Box>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(AddUser);