import React from 'react';

import Modal from 'react-bootstrap/Modal';
import Product from '../components/product/Product';
import http from "../http-common";

import { Link } from 'react-router-dom';
import {connect} from "react-redux";

import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
  Button,
  Typography
} from "@mui/material";

class ShoppingCart extends React.Component {
  state = {
    id:"",
    products: [],
    productsAdd: [],
    modalState: false,
    productsNot:  [],
    price: 0,
    address: "",
    userId: 0,
    
  };

  showModal = () => {
    this.setState({ modalState: true });
  }

  closeModal = () => {
    this.setState({ modalState: false });
  }


  componentDidMount() {
    this.getProducts();
    this.getUser();
  }
  
  getUser(){
    http
        .get("/users/" + this.props.user.id)
        .then((response) => {
            
            this.setState({ address: response.data.address });
            
        })
        .catch(e => {
            console.log(e);
        });
  }
  deleteProductFromShoppingCart = (product) => {
    http
        .delete("/shoppingCart/" + this.state.id +"/product/"+ product.id)
        .then(() => {
            this.getProducts();
           
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

        })
        .catch(e => {
            console.log(e);
        });

  };

  addProductToShoppingCart = (product) => {
    console.log(product)
    console.log(this.state.id)
        http
            .post("/shoppingCart/" + this.props.user.id, product)
            .then(() => {
                
                this.setState({products: [...this.state.products, product]})
            })
            .catch(e => {
                console.log(e);
            });
        

    };

    addOrder = () => {
        var data = {
            products: this.state.products,
            price: this.state.price,
            address: this.state.address,
            userId: this.props.user.id 
        }
        http
            .post("/addOrder/",data )
            .then(() => {
            })
            .catch(e => {
            console.log(e);
            });
        http
            .delete("clearShoppingCart/"+ this.state.id)
            .then(() => {
                this.setState({products: []})
            })
            .catch(e => {
            console.log(e);
            });
    }

  getProducts(){
    http
        .get("/shoppingCart/" + this.props.user.id )
        .then(response => {
          console.log(response.data.products)
          this.setState({ 
            id: response.data.id,
            products: response.data.products})
        })
        .catch(e => {
          console.log(e);
        });
    
  }


  render() {
    const { products, productsNot } = this.state;
    const productsClear = products.filter((product, i) => {return products.findIndex((p) => p.id === product.id) === i;});

    const counter = products.reduce((counter, product) => {
        if (counter[product.id]) {
        counter[product.id]++;
        } else {
        counter[product.id] = 1;
        }
        return counter;
    }, {});
    const count = []
    var allPrice = 0
    for (let i in productsClear){
        count.push(counter[productsClear[i].id])
        allPrice+=counter[productsClear[i].id]*productsClear[i].price
    }
    

    var list = [];
    for (let i in productsClear) {
        list.push(
        <Box
            sx={{
            ml: '20px',
            paddingLeft: '10px',
            width: '100%',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 1,
            borderRadius: 1,
            mt: '5px',
            }}
        >
            <List >
            <ListItem disablePadding>
                <ListItemText
                primary={
                    <Link style={{ textDecoration: 'none' }}>
                    <Product
                        key={i}
                        id={productsClear[i].id}
                        content={`${productsClear[i].name}, ${productsClear[i].price*count[i]}₽`}
                    />
                    </Link>
                }
                />
                <Button onClick={() => this.deleteProductFromShoppingCart(productsClear[i])}
                variant="outlined"
                sx={{":hover":{color: "#1D1F1F", borderColor: "#1D1F1F"},borderColor: "#474949", color: "#474949",marginTop:'-15px',
                 borderWidth:'3px', borderRadius: '40px', width: '10px', height: '30px'}}
                >
                <Typography sx={{fontSize: '24px', fontWeight: 'bold' }}>
                  -
                </Typography>
              </Button>
                <p style={{marginLeft: "10px", marginRight: '10px'}}>{count[i]}</p>
                <Button sx={{":hover":{color: "#1D1F1F", borderColor: "#1D1F1F"},borderColor: "#474949", color: "#474949",marginTop:'-15px',
                 borderWidth:'3px', borderRadius: '40px', width: '10px', height: '30px'}}
                 onClick={() => this.addProductToShoppingCart(productsClear[i])}
                variant="outlined"
              >
                <Typography sx={{fontSize: '24px', fontWeight: 'bold' }}>
                  +
                </Typography>
              </Button>
            </ListItem>
            </List>
        </Box>
        );
    }
    return (
        <div>

        {list.length ? (
          <div style={{ position: "absolute",
          top: '30%', left: '50%', transform: 'translate(-50%, -30%)'}}>
          <Button variant="contained" onClick={this.addOrder} sx={{":hover":{bgcolor: "#1D1F1F"},bgcolor: "#474949", mt: '30px', mb: '15px', ml: '20px' }}>
          Заказать
          </Button>
          <h5 style={{marginLeft: '20px'}}>Общая сумма заказа: {allPrice}₽</h5>
          {list}
          
          </div>
        ) : <h2 style={{marginTop: '10px', marginLeft: '10px'}}>Корзина пуста</h2>}
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

export default connect(mapStateToProps)(ShoppingCart);