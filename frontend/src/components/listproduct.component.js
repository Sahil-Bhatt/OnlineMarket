import React, {Component} from 'react';
import axios from 'axios';

export default class ListeditemList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {products: []}
    }

    componentDidMount() {
        axios.get('http://localhost:4000/getproducts')
             .then(response => {
                 this.setState({products: response.data});
             })
             .catch(function(error) {
                 console.log(error);
             })
    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Minimum Quantity</th>
                            <th>Price</th>
                            <th>Dispatch status</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.products.map((response, i) => {
                            return (
                                <tr>
                                    <td>{response.productname}</td>
                                    <td>{response.minimum_quantity}</td>
                                    <td>{response.price}</td>
                                    <td>{response.dispatch_status}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
            
        )
    }
}