import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Product from '../components/product/Product';
import http from "../http-common";

import { Link } from 'react-router-dom';

import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
  Button,
  Typography
} from "@mui/material";

class Menu extends React.Component {
  state = {
    id:"",
    products: [],
    productsAdd: [],
    modalState: false,
    productsNot:  []
    
  };

  showModal = () => {
    this.setState({ modalState: true });
  }

  closeModal = () => {
    this.setState({ modalState: false });
  }


  componentDidMount() {
    this.getProducts();
  }
  
  deleteProductFromMenu = (product) => {
    http
        .delete("/menu/" + this.state.id +"/product/"+ product.id)
        .then(() => {
            this.setState({products: this.state.products.filter(productEach => productEach.id !== product.id)})
            this.setState({productsNot: [...this.state.productsNot, product]})
        })
        .catch(e => {
            console.log(e);
        });
      
      this.getProducts();
    }

  handleAddProduct = (product) => {
    console.log(product)
    console.log(this.state.id)
    http
        .post("/menu/" + this.state.id, product)
        .then(() => {
            this.setState({productsNot: this.state.productsNot.filter(productEach => productEach.id !== product.id)})
            this.setState({products: [...this.state.products, product]})
        })
        .catch(e => {
            console.log(e);
        });
    
  };

  getProducts(){
    http
        .get("/menu")
        .then(response => {
          console.log(response.data.products)
          this.setState({ 
            id: response.data.id,
            products: response.data.products})
        })
        .catch(e => {
          console.log(e);
        });
    http
        .get("/productsNotInMenu")
        .then(response => {
          console.log(response.data)
          this.setState({ productsNot: response.data})
        })
        .catch(e => {
          console.log(e);
        });
  }


  render() {
    const { products,productsNot} = this.state;


    var list = [];
    for (let i in products) {
      list.push(
        
        <Box sx={{ml:'20px', paddingLeft: '10px',width: '100%', maxWidth: 400, bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 1,
        mt: '5px',
        }}>
        
          <List>
            <ListItem disablePadding>
                <ListItemText primary={<Link style={{textDecoration: "none"}}>
                <Product key={i} id={products[i].id} content={`${products[i].name}`} /></Link>} />
                <Button   variant="outlined"
                sx={{":hover":{color: "#1D1F1F", borderColor: "#1D1F1F"},borderColor: "#474949", color: "#474949",marginTop:'-15px', borderWidth:'3px', borderRadius: '40px', width: '10px', height: '30px' }}
                onClick={() => this.deleteProductFromMenu(products[i])}>
                <Typography sx={{fontSize: '24px', fontWeight: 'bold' }}>
                  -
                </Typography>
              </Button>
            </ListItem>
          </List>
        </Box> 
      )
    }
    return (

      <div style={{ position: "absolute",
        top: '30%', left: '50%', transform: 'translate(-50%, -30%)', width: 400,}} className="col-md-5">
        <Button variant="contained"sx={{":hover":{bgcolor: "#1D1F1F"},bgcolor: "#474949",
          mt:'30px', mb:'15px',ml:'20px'}} onClick={this.showModal}>
        Добавить
        </Button>
        {list.length ? list : <h2 style={{marginTop: '10px', marginLeft: '10px'}}>Добавьте в меню блюда</h2>}
        <Modal show={this.state.modalState} onHide={this.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Список продуктов</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsNot.map((product, i) => (
            <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => this.handleAddProduct(product)}>
                <ListItemText primary={<Link style={{textDecoration: "none"}}>
                <Product key={i} id={product.id} content={`${product.name}`} /></Link>} />
              </ListItemButton>
            </ListItem>
          </List>

          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModal}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>  
        </div>
      )
  }
   
}

export default Menu;