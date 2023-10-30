import React, { useState, useEffect }  from 'react';

import http from "../http-common";

import { Navigate, useParams } from 'react-router-dom';
import {connect} from "react-redux";

import {
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Box,
    Button
  } from "@mui/material";

function UserData(props) {

    const { id } = useParams();

    const [user, setUser] = useState({
        id: id,
        name: "",
        phone: "",
        address: "",
        role: ""
    });

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        function getUser() {
            http
                .get("/users/" + id)
                .then(response => {
                    if (response.data) {
                        setUser({
                            ...user,
                            name: response.data.name,
                            phone: response.data.phone,
                            address: response.data.address,
                            role: response.data.role
                        });
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        }
        getUser();
    },[]);

    function deleteUser() {
        http
            .delete("/users/" + user.id)
            .then(() => {
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });
    }

    return (
        !submitted ? (
            <div className="col-sm-5" style={{ position: "absolute",
            top: '30%', left: '50%', transform: 'translate(-50%, -30%)', width: 400,}}>
                <Box
                    sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    borderRadius: 1,
                    mt: '5px',
                    }}>
                    <label>Имя:</label>
                    <div className="form-group mb-3">
                        <input type="text" name="name " readOnly defaultValue={user.name} placeholder="Имя"  className="form-control"/>
                    </div>
                    <label>Телефон:</label>
                    <div className="form-group mb-3">
                        <input type="text" name="phone " readOnly defaultValue={user.phone} placeholder="Телефон"  className="form-control"/>
                    </div>
                    <label>Адрес:</label>
                    <div className="form-group mb-3">
                        <input type="text" name="address " readOnly defaultValue={user.address} placeholder="Адрес"  className="form-control"/>
                    </div>
                    <label>Роль:</label>
                    <div className="form-group mb-3">
                        <input type="text" name="role " readOnly defaultValue={user.role} placeholder="Роль"  className="form-control"/>
                    </div>
                    
                    <div className="row g-2 mt-1">
                        
                        <div className="col-auto">
                        <Button  variant="contained"sx={{":hover":{bgcolor: "#1D1F1F"},bgcolor: "#474949",
                            mt: '-15px', mb: '10px', ml:'150px'}}  onClick={deleteUser}>
                           Удалить
                        </Button>
                        </div>
                    </div>
                    </Box>
            </div>
        )
        : <Navigate to="/users" />
    )

}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(UserData);