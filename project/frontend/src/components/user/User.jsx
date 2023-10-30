import React from 'react';

class User extends React.Component {
  render() {
      return <div id={this.props.id} style={this.props.style ? this.props.style : {color: "#1D1F1F"}}>
        <div>{this.props.content}</div>
        <div>{this.props.children}</div>
      </div>
    }
  }

export default User;