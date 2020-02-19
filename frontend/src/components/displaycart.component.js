import React, {Component} from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';
import './global';

export default class DisplayCart extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            tempvar:localStorage.getItem("uname")
        }
    }


    rateProduct(productname,sellername)
    {
        window.location.href = "http://localhost:3000/rateproduct?pro="+productname+"&sell="+sellername;
    }
    
    getBack()
    {
        localStorage.setItem("uname", "Not Logged In");
        window.alert("You've been logged out");
        window.open("http://localhost:3000/","_self");
    }

    componentDidMount() {
        axios.get('http://localhost:4000/getpurchase/'+this.state.tempvar)
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

    render() {
        return (
            <div>
                <p>Logged In as: {this.state.tempvar}</p>
                &nbsp;<Button variant="danger" onClick={() => this.getBack()}>Logout</Button>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product</th>
                            <th>Vendor</th>
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
                                    <td>{response.sellername}</td>
                                    <td>{response.dispatch_status}</td>
                                    <td>
                                    <Button variant="success" onClick={() => this.rateProduct(response.productname,response.sellername)}>Rate this product</Button>
                                    </td>
                                    <td>
                                    </td>
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