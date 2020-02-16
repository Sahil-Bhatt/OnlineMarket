import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import './global';
import { ListGroup, ListGroupItem, Card} from 'react-bootstrap';
// import React, { Component } from 'react';
export default class ViewItem extends React.Component {
    state = {
      query: "",
      data: [],
      filteredData: []
    };
  
    handleInputChange = event => {
      const query = event.target.value;
  
      this.setState(prevState => {
        const filteredData = prevState.data.filter(element => {
          return element.productname.toLowerCase().includes(query.toLowerCase());
        });
  
        return {
          query,
          filteredData
        };
      });
    };
  
    getData = () => {
      axios.get(`http://localhost:4000/getproducts`)
        .then(response => response.data)
        .then(data => {
          const { query } = this.state;
          const filteredData = data.filter(element => {
            return element.productname.toLowerCase().includes(query.toLowerCase());
          });
  
          this.setState({
            data,
            filteredData
          });
        });
    };
  
    componentWillMount() {
      this.getData();
    }
  
    render() {
      return (
        <div className="searchForm">
            <Card bg="dark" text="white" style={{ width: '17rem' }}>
              <Card.Body>
                <Card.Text>
                  Logged in as : {sessionStorage.getItem("uname")}
                </Card.Text>
              </Card.Body>
            </Card>
            <br></br>
          <form>
            <input
              placeholder="Search for..."
              value={this.state.query}
              onChange={this.handleInputChange}
            />
          </form>
          <div>
          <ListGroup>
          {this.state.filteredData.map(i => <ListGroup.Item variant="dark">{i.productname}</ListGroup.Item>)}</ListGroup></div>
        </div>
      );
    }
}
