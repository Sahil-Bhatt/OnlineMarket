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
            reviews : [],
            tempvar:localStorage.getItem("cname"),
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
            review : '',
            currentrating : 0
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
                // this.setrating(response.data[0].sum_of_ratings,response.data[0].number_of_buyers);
                 console.log(response.data);
             })
             .catch(function(error) {
                 console.log(error);
             })

             axios.get('http://localhost:4000/getreviews/'+this.state.sellername)
            .then(response => {
                this.setState({reviews: response.data});
                this.getAvgRating(this.state.reviews);
                console.log(this.state.reviews);
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    setrating(sor,nob){
        if(sor == 0 || nob ==0){
            this.setState({currentrating : 0});
        }
        else
        {
            console.log(parseInt(nob));
            console.log(sor);
            let val = parseInt(sor)/parseInt(nob);
            this.setState({currentrating : sor});
        }
    }

    getAvgRating(review)
    {
        let arrlength = review.length;
        console.log(review);
        let avgval = 0;
        let i =0;
        for(i=0;i<arrlength;i++)
        {
            avgval += review[i].rating;
        }
        console.log(avgval);
        if(arrlength !=0)
        {
            avgval/= arrlength;
        }
        else{
            avgval = 0;
        }
        this.setState({currentrating : avgval});
    }

    getBack()
    {
        localStorage.setItem("cname", "Not Logged In");
        window.alert("You've been logged out");
        window.open("http://localhost:3000/","_self");
    }

    rateProduct(){
        
        var incrementbuyer = parseInt(this.state.number_of_buyers) + 1;
        var rate = parseInt(this.state.rating);
        var rev = this.state.review;
        var sumnow = parseInt(this.state.sum_of_ratings) + rate;
        if(rate <= 5 && rate >= 1)
        {
            this.setState({ review: rev, sum_of_ratings : sumnow });
            if(window.confirm("Confirm Rating ?"))
            {
                console.log(rev);
                this.confirmRating(rate,sumnow,rev,incrementbuyer);
            }
        }
        else
        {
            window.alert("Please enter a rating between 1 and 5");
        }

    }

    confirmRating(rate,sumofrates,rev,incrementbuyer)
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
            number_of_buyers : incrementbuyer,
            sum_of_ratings : sumofrates
        }
        axios.post('http://localhost:4000/reviewproduct/'+localStorage.getItem("cname"),Package)
             .then(res => console.log(res.data));
        
        const Review = {
            sellername : this.state.sellername,
            rating : rate,
            review : rev,
            buyername : localStorage.getItem("cname")
        }

        axios.post('http://localhost:4000/addreview',Review)
             .then(res => console.log(res.data));
    }

    render() {
        return (
            <div>
                <p>Logged In as: {this.state.tempvar}</p>
                &nbsp;<Button variant="danger" onClick={() => this.getBack()}>Logout</Button>
                <p>Product : {this.state.productname}</p>
                <p>Vendor : {this.state.sellername}</p>
                <p>Average product rating : {this.state.currentrating}</p>
                <input type="number" placeholder="rating" onChange={this.onChangeRating}/>
                <input type="text" placeholder="review" onChange={this.onChangeReview}/> 
                <Button variant="success" onClick={() => this.rateProduct()}>Rate Product</Button>
            </div>
        )
    }
}