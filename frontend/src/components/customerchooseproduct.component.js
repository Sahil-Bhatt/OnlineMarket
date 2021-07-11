import React, {Component} from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';
import './global';
import { number } from 'prop-types';

export default class ChooseProduct extends Component {
    
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
            currentrating : 0,
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
                        this.setqty(response.data[0].minimum_quantity,response.data[0].ordered_so_far);
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


    setqty(a,b)
    {
        this.setState({qtyleft: a-b});
    }
    setrating(sor,nob)
    {
        if(sor == 0 || nob ==0){
            this.setState({currentrating : 0});
        }
        else
        {
            let val = sor/nob;
            this.setState({currentrating : val});
        }
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
            rating : this.state.rating,
            number_of_buyers : this.state.number_of_buyers,
            sum_of_ratings : this.state.sum_of_ratings
        }
        // console.log(this.state.ordered_so_far);
        axios.post('http://localhost:4000/vendororder',Package)
             .then(res => console.log(res.data));
        
    }

    render() {
        return (
            <div>
                <p>Logged In as: {this.state.tempvar}</p>
                &nbsp;<Button variant="danger" onClick={() => this.getBack()}>Logout</Button>
                &nbsp;<Button variant="warning" onClick={() => window.open("http://localhost:3000/viewitems","_self")}>View Products</Button>

                <p>Product : {this.state.productname}</p>
                <p>Vendor : {this.state.sellername}</p>
                <p>Quantity Left : {this.state.qtyleft}</p>
                <p>Average rating of the vendor : {this.state.currentrating}</p>
                
                <input type="number" value={this.state.quantity} onChange={this.onChangeQty}/> 
                <Button variant="success" onClick={() => this.cartAdd()}>Add to Cart</Button>
                <Button variant="primary" onClick={() => window.open("http://localhost:3000/displaycart","_self")}>View Cart</Button>
                <br></br><br></br>
                <p>Vendor Reviews: </p>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Buyer</th>
                            <th>Review</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.reviews.map((response, i) => {
                            return (
                                <tr>
                                    <td>{response.buyername}</td>
                                    <td>{response.review}</td>
                                    <td>{response.rating}</td>
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