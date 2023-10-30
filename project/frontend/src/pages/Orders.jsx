import React from 'react';

import Order from '../components/product/Product';
import http from "../http-common";
import {connect} from "react-redux";
import Accordion from 'react-bootstrap/Accordion';

import { Link } from 'react-router-dom';

import {
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
  Button
} from "@mui/material";

class Orders extends React.Component {
  state = {
    orders: [],
    status: ["COOK", "DELIVER", "DONE"]
  };

  componentDidMount() {
    if(this.props.user === null)
        return
    if (this.props.user.roles.includes("ROLE_COOK"))
            this.getOrders(this.state.status[0]);
    else 
        this.getOrders(this.state.status[1])  
    }
  
  getOrders(statusSelected){
    http
        .get("/ordersByStatus/"+ statusSelected)
        .then(response => {
            console.log(response.data)
            console.log("HOOIIII")
            this.setState({ orders: response.data })
        })
        .catch(e => {
        console.log(e);
        });
  }

  toDelivery = (order) => {
        http
            .post("/changeOrderStatus/" + this.state.status[1], order)
            .then(() => {
                this.setState({orders: this.state.orders.filter(productEach => productEach.id !== order.id)})
            })
            .catch(e => {
                console.log(e);
            });

        }

    toUser = (order) => {
        http
            .post("/changeOrderStatus/" + this.state.status[2], order)
            .then(() => {
                this.setState({orders: this.state.orders.filter(productEach => productEach.id !== order.id)})
            })
            .catch(e => {
                console.log(e);
            });

        }

  render() {
    if(this.props.user === null)
        return
    const { orders } = this.state;


    var list = [];
    for (var i in orders) {
      list.push(
        <Box sx={{ml:'20px', paddingLeft: '10px',width: '100%', maxWidth: 400, bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 1,
        mt: '5px',
        }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={<Link style={{textDecoration: "none"}}>
                <Order key={i} id={orders[i].id} content={`${orders[i].id}`} /></Link>} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>  
      )
    }
    return (
      
      <div style={{marginLeft: '350px',marginTop:'20px',width:'50%'}}>
        {
            orders.map((order, i) => {
                return (
                    <Accordion >
                        <Accordion.Item eventKey={"" + order.id}>
                            <Accordion.Header>{"Заказ №"+ (i+1)}</Accordion.Header>
                            <Accordion.Body>
                            <div><h5>Заказ состоит из: </h5></div>
                            {order.products.map((product) => (
                                <>
                                
                                <div key={product.id}>
                                    {product.name}
                                </div>

                                </>
                            ))}
                            {this.props.user.roles.includes("ROLE_DELIVER") && (
                               <>
                               <div><h5>Адрес: </h5></div> 
                               <div>
                                   {order.address}
                               </div>

                               </>
                              
                            )}
                            <Button  sx={{color:'white', mt:'20px',":hover":{bgcolor: "#1D1F1F"},bgcolor: "#474949"}} 
                            onClick={() => order.status === "DELIVER" ? this.toUser(order) : this.toDelivery(order)}>Готово</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>                                   
                )
            })
        }
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

export default connect(mapStateToProps)(Orders);