import React, {Component} from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';
import './global';

export default class DisplayCart extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            tempvar:localStorage.getItem("cname"),
            ordertemp : 0
        }
    }


    rateProduct(productname,sellername,dispatch_status)
    {
        if(dispatch_status == "Dispatched")
        {
            window.location.href = "http://localhost:3000/rateproduct?pro="+productname+"&sell="+sellername;
        }
        else
        {
            window.alert("Hello! " + localStorage.getItem("cname") + ". Please review us once your order is dispatched. We highly value customer feedback");
        }
    }

    editOrder(productname,sellername,dispatch_status)
    {
        if(dispatch_status == "Listed")
        {
            window.location.href = "http://localhost:3000/editorder?pro="+productname+"&sell="+sellername+"&disp="+dispatch_status;
    
        }
        else{
            window.alert("Sorry, your order details cannot be edited now");
        }
    }

    getBack()
    {
        localStorage.setItem("cname", "Not Logged In");
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
        console.log(global.user);
    }

    render() {
        return (
            <div>
                <p>Logged In as: {this.state.tempvar}</p>
                &nbsp;<Button variant="danger" onClick={() => this.getBack()}>Logout</Button>
                &nbsp;<Button variant="primary" onClick={() => window.open("http://localhost:3000/viewitems","_self")}>View Products</Button>
                <br></br><br></br>
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
                                    <Button variant="warning" onClick={() => this.editOrder(response.productname,response.sellername,response.dispatch_status)}>Edit this Order</Button>
                                    </td>
                                    <td>
                                    <Button variant="success" onClick={() => this.rateProduct(response.productname,response.sellername,response.dispatch_status)}>Rate this product</Button>
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