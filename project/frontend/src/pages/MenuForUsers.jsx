import React from 'react';

import http from "../http-common";


import {connect} from "react-redux";

import {
  Button,
  Typography
} from "@mui/material";
import Accordion from 'react-bootstrap/Accordion';

class MenuForUsers extends React.Component {
  state = {
    id:"",
    products: [],
    orders: [],
    link: "",
    pics: [],
    
  };


  componentDidMount() {
    this.getProducts();
    this.getOrders();
  }
  

    addProductToShoppingCart = (product) => {
        http
            .post("/shoppingCart/" + this.props.user.id, product)
            .then(() => {
            })
            .catch(e => {
                console.log(e);
            });
        }

    deleteOrder = (order) => {
        http
            .delete("/orders/" + order.id)
            .then(() => {
                this.setState({orders: this.state.orders.filter(productEach => productEach.id !== order.id)})
            })
            .catch(e => {
                console.log(e);
            });
    }
        
    
    
  getProducts() {
        http
            .get("/productsFiles")
            .then(response => {
                if (response.data) {
                    this.setState({ products: response.data})
                    const tmp = []
                    for (var i in response.data){
                      const productData = response.data[i].product;
                      const link = this.getLink(response.data[i].file, productData.mimeType);
                      tmp.push(link)
                    }
                    this.setState({pics: tmp})
                }
            })
            .catch(e => {
                console.log(e);
            });
          }

    
    getLink(base64, mime_type){
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


  getOrders(){
    if (this.props.user !== null)
      http
          .get("/orders/user/" + this.props.user.id)
          .then(response => {
              console.log(response.data)
              this.setState({ orders: response.data})
          })
          .catch(e => {
              console.log(e);
      });
  }


  render() {
    const { products, orders, pics} = this.state; 
    var list = [];

    list.push(
      <div style={{  marginRight: '40px', display: 'grid', gridTemplateColumns: '1fr auto', marginTop: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '60px'}}>
          {products.map((product, i) => (
            <div key={i} style={{ textAlign: 'center'}}>         
              {product.product.mimeType.includes('image') && (
                <img src={pics[i]}  style={{ borderRadius: '100px', width: '200px', height: '200px' }} />
              )}
              <h3 style={{ wordWrap: 'break-word'}}>{product.product.name}</h3>
              <p>{product.product.price}₽</p>
              <Button onClick={() => this.addProductToShoppingCart(product.product)}
                variant="outlined"
                sx={{":hover":{color: "#1D1F1F", borderColor: "#1D1F1F"},borderColor: "#474949", color: "#474949",marginTop:'-15px', borderWidth:'3px', borderRadius: '40px', width: '10px', height: '30px' }}
              >
                <Typography sx={{fontSize: '24px', fontWeight: 'bold' }}>
                  +
                </Typography>
              </Button>
            </div>
      
          ))}
        </div>
        {this.props.user !== null && (
        <div style={{ width: '250px' }}>
          <div style={{ width: '250px'}}>
            <Accordion>
              <Accordion.Item eventKey="orders">
                <Accordion.Header>Заказы</Accordion.Header>
                <Accordion.Body>
                  {orders.map((order, i) => (
                    <Accordion key={order.id}>
                      <Accordion.Item eventKey={"" + order.id}>
                        <Accordion.Header>{"Заказ №" + (i+1)}</Accordion.Header>
                        <Accordion.Body>
                          <div><h5>Заказ состоит из: </h5></div>
                          {order.products.map((product) => (
                            <div key={product.id}>{product.name}</div>
                          ))}
                          <div><h5>Статус:</h5> </div>
                          {order.status === 'DONE' && (
                            <>
                              <p>Получено</p>
                              <Button variant="contained"sx={{":hover":{bgcolor: "#1D1F1F"},bgcolor: "#474949"}}
                               onClick={() => this.deleteOrder(order)}>Хорошо</Button>
                            </>
                          )}
                          {order.status === 'COOK' && <p>Готовится</p>}
                          {order.status === 'DELIVER' && <p>В пути</p>}
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
        )}
      </div>
    );

    return (
      <div>
        {list}
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

export default connect(mapStateToProps)(MenuForUsers);