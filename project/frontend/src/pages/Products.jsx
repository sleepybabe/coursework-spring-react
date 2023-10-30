import React from 'react';

import Product from '../components/product/Product';
import http from "../http-common";

import { Link } from 'react-router-dom';

import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
  Button
} from "@mui/material";

class Products extends React.Component {
  state = {
    products: [],
  };


  componentDidMount() {
    http
        .get("/products")
        .then(response => {
          console.log(response.data)
          this.setState({ products: response.data })
        })
        .catch(e => {
          console.log(e);
        });
  }

  render() {
    const { products } = this.state;


    var list = [];
    for (var i in products) {
      list.push(
        <Box sx={{ml:'20px', paddingLeft: '10px',width: '100%', maxWidth: 400, bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 1,
        mt: '5px',
        }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={<Link style={{textDecoration: "none"}} to={`/products/${products[i].id}`} param1={products[i].id}>
                <Product key={i} id={products[i].id} content={`${products[i].name}`} /></Link>} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>  
      )
    }
    return (

      <div style={{ position: "absolute",
      top: '30%', left: '50%', transform: 'translate(-50%, -30%)', width: 400,}}>
        <Button  variant="contained"sx={{":hover":{bgcolor: "#1D1F1F"},bgcolor: "#474949",
          mt:'30px', mb:'15px',ml:'20px'}}>
          <Link style={{textDecoration: "none", color:'white'}}  to={`/addProduct`}>Добавить продукт</Link>
        </Button>
        {list.length ? list : "Подождите, идёт загрузка данных"}
        </div>
      )
  }
   
}

export default Products;