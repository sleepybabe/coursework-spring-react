import React, { useState, useEffect }  from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from "react-redux";
import http from "../../http-common";

import {
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Box,
    Button,
    Typography
  } from "@mui/material";

function Profile(props){
    const { user: currentUser } = props;
    if(currentUser === null)
        return
    const { id } = currentUser.id;
    const [curuser, setUser] = useState({
        id: id,
        name: "",
        phone: "",
        address: "",
        username: ""
    });

    const [submitted, setSubmitted] = useState(false);
    
    useEffect(() => {
        function getUser() {
            http
                .get("/users/" + currentUser.id)
                .then(response => {
                    if (response.data) {
                        setUser({
                            ...curuser,
                            name: response.data.name,
                            phone: response.data.phone,
                            address: response.data.address,
                            username: response.data.username
                        });
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        }
        if (curuser.name === "" || submitted === true)
            getUser();
    },[]);

    

    function handleChangeName(event) {
        setUser({
            ...curuser,
            name: event.target.value
        });
    }

    // function handleChangePassword(event) {
    //     setUser({
    //         ...curuser,
    //         password: event.target.value
    //     });
    // }

    function handleChangePhone(event) {
        setUser({
            ...curuser,
            phone: event.target.value
        });
    }

    function handleChangeAddress(event) {
        setUser({
            ...curuser,
            address: event.target.value
        });
    }

    function handleChangeUsername(event) {
        setUser({
            ...curuser,
            username: event.target.value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        var data = {
            name: curuser.name,
            username: curuser.username,
            address: curuser.address,
            phone: curuser.phone
        };
        console.log(data)
        http
            .post("/users/" + currentUser.id, data)
            .then(() => {
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });
        // getUser();
    }
    

    return (
        !submitted ? (
            <div className="col-sm-5" style={{ position: "absolute",
            top: '30%', left: '50%', transform: 'translate(-50%, -30%)', width: 400,}}>
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
                <form style={{ml: '10px', mr: '10px'}} onSubmit={handleSubmit}>
                    <label>Имя:</label>
                    <div className="form-group mb-3">
                        <input type="text" name="name" value={curuser.name} placeholder="Имя" onChange={handleChangeName} className="form-control"/>
                    </div>
                    <label>Логин:</label>
                    <div className="form-group mb-3">
                        <input type="text" name="username" value={curuser.username} placeholder="Логин" onChange={handleChangeUsername} className="form-control"/>
                    </div>
                    <label>Адрес:</label>
                    <div className="form-group mb-3">
                        <input type="text" name="address" value={curuser.address} placeholder="Адрес" onChange={handleChangeAddress} className="form-control"/>
                    </div>
                    <label>Телефон:</label>
                    <div className="form-group mb-3">
                        <input type="text" name="phone" value={curuser.phone} placeholder="Телефон" onChange={handleChangePhone} className="form-control"/>
                    </div>
                    <div className="row g-2 mt-1">
                        <Button type="submit"
                        variant='contained' 
                        sx={{":hover":{bgcolor: "#1D1F1F"},bgcolor: "#474949",color:'white', marginTop:'5px',  marginBottom:'10px', borderWidth:'3px', marginLeft:'25%',borderRadius: '40px', width: '50%', height: '30px' }}
                    >
                        <Typography >
                        Обновить
                        </Typography>
                    </Button>
                    </div>
               
                </form>
                </Box>
            </div>
        )
        : window.location.reload()
        
    )

}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user
  };
}

export default connect(mapStateToProps)(Profile);