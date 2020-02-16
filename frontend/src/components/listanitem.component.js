import React, {Component} from 'react';
import axios from 'axios';
import './global';

export default class ListAnItem extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            sellername: '',
            productname: '',
            price: 0,
            minimum_quantity: 0,
            dispatch_status: '',
            rating: 0,
            ordered_so_far: 0
        }

        this.onChangeProductname = this.onChangeProductname.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeQty = this.onChangeQty.bind(this);
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

    onSubmit(e) {
        e.preventDefault();

        const newProduct = {
            sellername: global.user,
            productname: this.state.productname,
            price: this.state.price,
            minimum_quantity: this.state.minimum_quantity,
            dispatch_status: "Listed",
            rating: 0,
            ordered_so_far: 0
        }

        axios.post('http://localhost:4000/vendoraddproduct', newProduct)
             .then(res => console.log(res.data));

        this.setState({
            productname: '',
            price: 0,
            minimum_quantity: 0,
        });
    }

    render() {
        return (
            <div>
                {/* <p value={this.state.something}
                 onChange={event => {this.setState({'something': event.target.value})}}/> */}
                <p>Logged In as: {sessionStorage.getItem("uname")}</p>
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
                        <input type="submit" value="Create Product" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}