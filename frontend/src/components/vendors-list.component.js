import React, {Component} from 'react';
import axios from 'axios';

export default class VendorsList extends Component {
    
    constructor(props) {
        super(props);
        this.state = {vendors: []}
    }

    componentDidMount() {
        axios.get('http://localhost:4000/')
             .then(response => {
                 this.setState({vendors: response.data});
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
                            <th>Username</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.vendors.map((currentVendor, i) => {
                            return (
                                <tr>
                                    <td>{currentVendor.username}</td>
                                    <td>{currentVendor.password}</td>
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