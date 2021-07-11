import React, {Component} from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';
import './global';

export default class ListeditemList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            tempvar:localStorage.getItem("vname")
        }
    }

    getBack()
    {
        localStorage.setItem("vname", "Not Logged In");
        window.alert("You've been logged out");
        window.open("http://localhost:3000/","_self");
    }


    componentDidMount() {
        axios.get('http://localhost:4000/getdispatchedproducts/'+this.state.tempvar)
             .then(response => {
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
        console.log(global.user);
    }

    render() {
        return (
            <div>
                <p>Logged In as: {this.state.tempvar}</p>
                &nbsp;<Button variant="danger" onClick={() => this.getBack()}>Logout</Button>
                <Button variant="primary" onClick={() => window.open("http://localhost:3000/listproduct","_self")}>Vendor Home</Button>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Dispatch status</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((response, i) => {
                            return (
                                <tr>
                                    <td><img src={require(`${response.pimage}`)} width="100" height="70"></img></td>
                                    <td>{response.productname}</td>
                                    <td>{response.dispatch_status}</td>
                                    <td>{response.sum_of_ratings}</td>
                                    <td>{response.number_of_buyers}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </div>
        )
    }
}