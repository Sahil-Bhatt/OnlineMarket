import React, {Component} from 'react';
import axios from 'axios';
import './global';
import { Table, Button, Alert } from 'react-bootstrap';

export default class ListAnItem extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            sellername: '',
            productname: '',
            price: 0,
            minimum_quantity: 0,
            dispatch_status: '',
            pimage: './product.png',
            rating: 0,
            ordered_so_far: 0,
            review : ''
        }

        this.onChangeProductname = this.onChangeProductname.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQty = this.onChangeQty.bind(this);
        this.onChangeImg = this.onChangeImg.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangeProductname(event) {
        this.setState({ productname: event.target.value });
    }

    onChangePrice(event) {
        this.setState({ price: event.target.value });
    }

    onChangeQty(event) {
        this.setState({ minimum_quantity: event.target.value });
    }

    onChangeImg(event) {
        this.setState({ pimage: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newProduct = {
            sellername: localStorage.getItem("uname"),
            productname: this.state.productname,
            price: this.state.price,
            minimum_quantity: this.state.minimum_quantity,
            dispatch_status: "Listed",
            pimage: this.state.pimage,
            rating: 0,
            ordered_so_far: 0,
            sum_of_ratings: 0,
            number_of_buyers: 0,
            review : ''
        }

        axios.post('http://localhost:4000/vendoraddproduct', newProduct)
             .then(res => console.log(res.data));

        this.setState({
            productname: '',
            price: 0,
            minimum_quantity: 0,
        });
    }

    getBack()
    {
        localStorage.setItem("uname", "Not Logged In");
        window.alert("You've been logged out");
        window.open("http://localhost:3000/","_self");
    }

    render() {
        return (
            <div>
                <p>Logged In as: {localStorage.getItem("uname")}</p>
                &nbsp;<Button variant="danger" onClick={() => this.getBack()}>Logout</Button>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Product: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.productname}
                               onChange={this.onChangeProductname}
                               />
                    </div>
                    <div className="form-group">
                        <label>Price: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.price}
                               onChange={this.onChangePrice}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Minimum Quantity: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.minimum_quantity}
                               onChange={this.onChangeQty}
                               />  
                    </div>
                    <div className="form-group">
                        <label>Image path: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.pimage}
                               onChange={this.onChangeImg}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Product" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}