import React, {Component} from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';
import './global';
import { number } from 'prop-types';

export default class EditOrder extends Component {
    
    constructor(props) {
        super(props);
        const queryString = window.location.search;
        console.log(queryString);
        var urlparams = new URLSearchParams(queryString);
        this.state = {
            products: [],
            tempvar:localStorage.getItem("cname"),
            productname : urlparams.get('pro'),
            sellername : urlparams.get('sell'),
            minimum_quantity : 0,
            dispatch_status : urlparams.get('disp'),
            ordered_so_far : 0,
            quantity : 0,
            qtyleft : 0
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
                         minimum_quantity : response.data[0].minimum_quantity,
                         ordered_so_far : response.data[0].ordered_so_far,
                        });
                this.setqty(response.data[0].minimum_quantity,response.data[0].ordered_so_far);
                 console.log(response.data);
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    setqty(a,b)
    {
        this.setState({qtyleft: a-b});
    }
    
    getBack()
    {
        localStorage.setItem("cname", "Not Logged In");
        window.alert("You've been logged out");
        window.open("http://localhost:3000/","_self");
    }

    cartAdd(){
              
        var updateqty = parseInt(this.state.quantity) + parseInt(this.state.ordered_so_far);
        var ok = parseInt(this.state.quantity);
        console.log(updateqty);
        if(updateqty <= this.state.minimum_quantity && ok>=0)
        {
            this.setState({ ordered_so_far : updateqty});
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

        const Package = {
            productname : this.state.productname,
            sellername : this.state.sellername,
            ordered_so_far : qty,
            minimum_quantity : this.state.minimum_quantity,
        }
        axios.post('http://localhost:4000/vendororder',Package)
             .then(res => console.log(res.data));
        
    }

    render() {
        return (
            <div>
                <p>Logged In as: {this.state.tempvar}</p>
                &nbsp;<Button variant="danger" onClick={() => this.getBack()}>Logout</Button>
                <p>Product : {this.state.productname}</p>
                <p>Vendor : {this.state.sellername}</p>
                <p>Quantity Left : {this.state.qtyleft}</p>
                <p>Vendor Reviews: </p>
                
                <input type="number" value={this.state.quantity} onChange={this.onChangeQty}/> 
                <Button variant="success" onClick={() => this.cartAdd()}>Add extra quantity to Cart</Button>
                <Button variant="primary" onClick={() => window.open("http://localhost:3000/displaycart","_self")}>View Cart</Button>
            </div>
        )
    }
}