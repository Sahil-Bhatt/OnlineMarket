import React, {Component} from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';
import './global';

export default class ListeditemList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            tempvar:localStorage.getItem("uname")
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/getproducts/'+this.state.tempvar)
             .then(response => {
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
        // global.user = Request.QueryString["myvar"];
        console.log(global.user);
        // this.setState({tempvar:global.user});
    }


  cancelProduct(productname) {

    axios.post('http://localhost:4000/cancelproduct/'+productname)
             .then(res => console.log(res.data));

    axios.get('http://localhost:4000/getproducts/'+this.state.tempvar)
    .then(response => {
        this.setState({products: response.data});
    })
    .catch(function(error) {
        console.log(error);
    })
  }

  dispatchProduct(productname) {

    axios.post('http://localhost:4000/dispatchproduct/'+productname)
             .then(res => console.log(res.data));

    axios.get('http://localhost:4000/getproducts/'+this.state.tempvar)
    .then(response => {
        this.setState({products: response.data});
    })
    .catch(function(error) {
        console.log(error);
    })
  }

    render() {
        return (
            <div>
                <p>Logged In as: {this.state.tempvar}</p>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Minimum Quantity</th>
                            <th>Price</th>
                            <th>Dispatch status</th>
                            <th>Quantity ordered so far</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((response, i) => {
                            return (
                                <tr>
                                    <td><img src={require(`${response.pimage}`)} width="100" height="70"></img></td>
                                    <td>{response.productname}</td>
                                    <td>{response.minimum_quantity}</td>
                                    <td>{response.price}</td>
                                    <td>{response.dispatch_status}</td>
                                    <td>{response.ordered_so_far}</td>
                                    <td>
                                    <Button variant="success" onClick={() => this.dispatchProduct(response.productname)}>Dispatch</Button>
                                    &nbsp;<Button variant="danger" onClick={() => this.cancelProduct(response.productname)}>Cancel</Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
                <Button variant="warning" onClick={() => window.open("http://localhost:3000/listme","_self")}>List a new item </Button>
            </div>
        )
    }
}