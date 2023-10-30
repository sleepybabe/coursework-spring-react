import React from 'react';

import User from '../components/user/User';
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

class Users extends React.Component {
  state = {
    users: [],
  };


  componentDidMount() {
    http
        .get("/users")
        .then(response => {
          console.log(response.data)
          this.setState({ users: response.data })
        })
        .catch(e => {
          console.log(e);
        });
  }

  render() {
    const { users } = this.state;


    var list = [];
    for (var i in users) {
      list.push(
        <Box sx={{ml:'20px', paddingLeft: '10px',width: '100%', width: 400, bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 1,
        mt: '5px',
        }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={<Link style={{textDecoration: "none"}} to={`/users/${users[i].id}`} param1={users[i].id}>
                <User key={i} id={users[i].id} content={`Логин: ${users[i].username}; роль: ${users[i].role}`} /></Link>} />
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
          <Link style={{textDecoration: "none", color:'white'}}  to={`/addUser`}>Добавить пользователя </Link>
        </Button>
        {list.length ? list : <h2 style={{marginTop: '10px', marginLeft: '10px'}}>Добавьте пользователей</h2>}
        </div>
      )
  }
    
}

export default Users;