import React from 'react';

import http from "../http-common";

import { Navigate } from 'react-router-dom';


import {
    Box,
    Button
} from "@mui/material";

class AddProduct extends React.Component {
    constructor() {
        super();

        this.state = {
            name: "",
            price:"",
            description: "",
            submitted : false,
            file: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleFileChange(event) {
        console.log(event.target.files[0])
        this.setState({file: event.target.files[0]});
    };

    handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", this.state.name);
        formData.append("price", this.state.price);
        formData.append("description", this.state.description);
        formData.append("file", this.state.file);

        http
            .post("/addProduct", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                this.setState({submitted: true});
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        if (this.state.submitted) {
            return <Navigate to="/products" />;
        }
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
                        <input type="text" name="name" value={this.state.name} placeholder="Наименование" onChange={this.handleChange} className="form-control"/>
                    </div>
                    <div className="form-group mb-3">
                        <input type="number" name="price" value={this.state.price} placeholder="Цена" onChange={this.handleChange} className="form-control"/>
                    </div>
                    <div className="form-group mb-3">
                        <input type="text" name="description" value={this.state.description} placeholder="Описание" onChange={this.handleChange} className="form-control"/>
                    </div>
                    <div className="form-group mb-3">
                        <input className="form-control" type="file" id="file" onChange={this.handleFileChange} required/>
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


export default (AddProduct);