import React, {Component} from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';
import './global';
import { number } from 'prop-types';

export default class RateProduct extends Component {
    
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
            quantity : 0,
            number_of_buyers : 0,
            sum_of_ratings : 0,
            review : ''
        }
        this.onChangeRating = this.onChangeRating.bind(this);
        this.onChangeReview = this.onChangeReview.bind(this);
    }

    onChangeRating(event) {
        this.setState({ rating: event.target.value });
    }

    onChangeReview(event) {
        this.setState({ review: event.target.value });
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
                         ordered_so_far : response.data[0].ordered_so_far,
                         number_of_buyers : response.data[0].number_of_buyers,
                         sum_of_ratings : response.data[0].sum_of_ratings
                        });
                 console.log(response.data);
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    getBack()
    {
        localStorage.setItem("uname", "Not Logged In");
        window.alert("You've been logged out");
        window.open("http://localhost:3000/","_self");
    }

    rateProduct(){
        
        var rate = parseInt(this.state.rating);
        var rev = this.state.review;
        var sumnow = parseInt(this.state.sum_of_ratings) + rate;
        // console.log(updateqty);
        if(rate <= 5 && rate >= 1)
        {
            this.setState({ rating : rate, review: rev, sum_of_ratings : sumnow });
            if(window.confirm("Confirm Rating ?"))
            {
                console.log(rev);
                this.confirmRating(rate,sumnow,rev);
            }
        }
        else
        {
            window.alert("Please enter a rating between 1 and 5");
        }

    }

    confirmRating(rate,sumofrates,rev)
    {

        const Package = {
            productname : this.state.productname,
            sellername : this.state.sellername,
            ordered_so_far : this.state.ordered_so_far,
            price : this.state.price,
            minimum_quantity : this.state.minimum_quantity,
            dispatch_status : this.state.dispatch_status,
            pimage : this.state.pimage,
            rating : rate,
            number_of_buyers : this.state.number_of_buyers,
            sum_of_ratings : sumofrates,
            review : rev,
        }
        axios.post('http://localhost:4000/reviewproduct/'+localStorage.getItem("uname"),Package)
             .then(res => console.log(res.data));
        
    }

    render() {
        return (
            <div>
                <p>Logged In as: {this.state.tempvar}</p>
                &nbsp;<Button variant="danger" onClick={() => this.getBack()}>Logout</Button>
                <p>Product : {this.state.productname}</p>
                <p>Vendor : {this.state.sellername}</p>
                <input type="number" placeholder="rating" onChange={this.onChangeRating}/>
                <input type="text" placeholder="review" onChange={this.onChangeReview}/> 
                <Button variant="success" onClick={() => this.rateProduct()}>Rate Product</Button>
            </div>
        )
    }
}