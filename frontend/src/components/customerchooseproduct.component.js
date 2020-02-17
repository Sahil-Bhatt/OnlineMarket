import React, {Component} from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';
import './global';

export default class ChooseProduct extends Component {
    
    constructor(props) {
        super(props);
        const queryString = window.location.search;
        console.log(queryString);
        var urlparams = new URLSearchParams(queryString);
        this.state = {
            products: [],
            tempvar:localStorage.getItem("uname"),
            productname : urlparams.get('pro'),
            sellername : urlparams.get('sell')
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
    }

    cartAdd(){
        var ok = document.getElementById("ok").value;
        console.log(ok)
    }

    render() {
        return (
            <div>
                <p>Logged In as: {this.state.tempvar}</p>
                <p>Product : {this.state.productname}</p>
                <p>Vendor : {this.state.sellername}</p>
                <input type="number" placeholder="Quantity"></input>
                <Button id="ok" variant="success" onClick={() => this.cartAdd()}>Add to Cart</Button>
            </div>
        )
    }
}