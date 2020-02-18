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
            sellername : urlparams.get('sell'),
            price : 0,
            minimum_quantity : 0,
            dispatch_status : '',
            pimage : '',
            rating : 0,
            ordered_so_far : 0,
            quantity : 0
        }
        this.onChangeQty = this.onChangeQty.bind(this);
    }

    onChangeQty(event) {
        this.setState({ quantity: event.target.value });
    }

    componentDidMount() {
        const ProID = {
            productname : this.state.productname,
            sellername : this.state.sellername
        }
        axios.post('http://localhost:4000/getorderdetails',ProID)
             .then(response => {
                 this.setState(
                     {
                         products: response.data,
                         price : response.data[0].price,
                         minimum_quantity : response.data[0].minimum_quantity,
                         dispatch_status : response.data[0].dispatch_status,
                         pimage : response.data[0].pimage,
                         rating : response.data[0].rating,
                         ordered_so_far : response.data[0].ordered_so_far
                        });
                 console.log(response.data);
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    cartAdd(){
        
        console.log(parseInt(this.state.minimum_quantity));
        console.log(this.state.quantity);
        console.log(this.state.ordered_so_far);
        var updateqty = parseInt(this.state.quantity) + parseInt(this.state.ordered_so_far);
        console.log(updateqty);
        if(updateqty <= this.state.minimum_quantity)
        {
            this.setState({ ordered_so_far : updateqty });
            if(window.confirm("Confirm Order ?"))
            {
                this.confirmOrder(updateqty);
            }
        }
        else
        {
            window.alert("Please enter a quantity less than or equal to quantity left");
        }

    }

    confirmOrder(qty)
    {

        const Purchase = {
            productname : this.state.productname,
            sellername : this.state.sellername,
            buyername : this.state.tempvar,
            pimage : this.state.pimage,
            dispatch_status : this.state.dispatch_status,
            quantity : this.state.quantity,
            minimum_quantity : this.state.minimum_quantity
        }

        axios.post('http://localhost:4000/addpurchase',Purchase)
            .then(res => console.log(res.data));

        const Package = {
            productname : this.state.productname,
            sellername : this.state.sellername,
            ordered_so_far : qty,
            price : this.state.price,
            minimum_quantity : this.state.minimum_quantity,
            dispatch_status : this.state.dispatch_status,
            pimage : this.state.pimage,
            rating : this.state.rating
        }
        // console.log(this.state.ordered_so_far);
        axios.post('http://localhost:4000/vendororder',Package)
             .then(res => console.log(res.data));
        
    }

    render() {
        return (
            <div>
                <p>Logged In as: {this.state.tempvar}</p>
                <p>Product : {this.state.productname}</p>
                <p>Vendor : {this.state.sellername}</p>
                <input type="number" value={this.state.quantity} onChange={this.onChangeQty}/> 
                <Button variant="success" onClick={() => this.cartAdd()}>Add to Cart</Button>
                <Button variant="primary" onClick={() => window.open("http://localhost:3000/displaycart","_self")}>View Cart</Button>
            </div>
        )
    }
}