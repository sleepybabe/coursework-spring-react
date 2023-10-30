import React, { useState, useEffect }  from 'react';

import http from "../http-common";

import { Navigate, useParams } from 'react-router-dom';
import {connect} from "react-redux";



import {
    Box,
    Button
} from "@mui/material";

function ProductData(props) {

    const { id } = useParams();

    const [product, setProduct] = useState({
        id: id,
        name: "",
        price: "",
        description: "",
        file_name: "",
        mime_type: ""
    });

    const [filePath, setFilePath] = useState("");

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        function getProduct() {
            http
                .get("/productFile/" + id)
                .then(response => {
                    if (response.data) {
                        const productData = response.data.product;
                        setProduct({
                            ...product,
                            name: productData.name,
                            price: productData.price,
                            description: productData.description,
                            file_name: productData.fileName,
                            mime_type: productData.mimeType
                        });
                        console.log(product)
                        const link = getLink(response.data.file, productData.mimeType);
                        setFilePath(link);
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        }
        getProduct();
    },[]);

    
    function getLink(base64, mime_type){
        console.log(mime_type)
        var byteCharacters = atob(base64);
        var byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        var byteArray = new Uint8Array(byteNumbers);
        var file = new Blob([byteArray], { type:  mime_type });
        var fileURL = URL.createObjectURL(file);
        return fileURL;
    }

    function handleChangeName(event) {
        setProduct({
            ...product,
            name: event.target.value
        });
    }

    function handleChangePrice(event) {
        setProduct({
            ...product,
            price: event.target.value
        });
    }

    function handleChangeDescription(event) {
        setProduct({
            ...product,
            description: event.target.value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        var data = {
            name: product.name,
            price: product.price,
            description: product.description
        };
        http
            .post("/updateProduct/" + product.id, data)
            .then(() => {
                setSubmitted(true);
            })
            .catch(e => {
                console.log(e);
            });
    }

    function deleteProduct() {
        http
            .delete("/products/" + product.id)
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
            top: '70%', left: '50%', transform: 'translate(-50%, -70%)', width: 400,}}>
                <Box
                    sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 1,
                    borderRadius: 1,
                    mt: '5px',
                    }}>
                <form onSubmit={handleSubmit}>
                    <label>Название:</label>
                    <div className="form-group mb-3">
                        <input type="text" name="name" value={product.name} placeholder="Название" onChange={handleChangeName} className="form-control"/>
                    </div>
                    <label>Цена:</label>
                    <div className="form-group mb-3">
                        <input type="number" name="price" value={product.price} placeholder="Цена" onChange={handleChangePrice} className="form-control"/>
                    </div>
                    <label>Описание:</label>
                    <div className="form-group mb-3">
                        <input type="text" name="description" value={product.description} placeholder="Описание" onChange={handleChangeDescription} className="form-control"/>
                    </div>
                    <label>Фотография:</label>
                    <div className="form-group mb-3">
                         {product.mime_type.includes("image") && <img src={filePath} style={{ width: '200px' }} />}
                    </div>

                    <a href={filePath} target="_blank" rel="noopener noreferrer">Открыть файл</a>
                    <div className="row g-2 mt-1">
                        <div className="col-auto">
                        <Button  variant="contained"sx={{":hover":{bgcolor: "#1D1F1F"},bgcolor: "#474949",
                            mt: '-15px', mb: '10px', ml:'150px'}} type="submit">
                           Обновить
                        </Button>
                        </div>
                        <div className="col-auto">
                        <Button  variant="contained"sx={{":hover":{bgcolor: "#1D1F1F"},bgcolor: "#474949",
                            mt: '-15px', mb: '10px', ml:'150px', width: '113px'}}  onClick={deleteProduct}>
                           Удалить
                        </Button>
                        </div>
                    </div>

                </form>
                </Box>
            </div>
        )
        : <Navigate to="/products" />
    )

}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
        user
    };
}

export default connect(mapStateToProps)(ProductData);