import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import './global';

export default class VendorLogin extends Component {
    
    // products: [];
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            // products: []
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    
    onChangeUsername(event) {
        this.setState({ username: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }


    async retrievePassword() {

        const response = await axios.get('http://localhost:4000/vpwdcheck/'+this.state.username);
        if(this.state.password == response.data[0].password){
                console.log(global.user);
                global.user = this.state.username;
                console.log(global.user);
            }

            //  .then(response => {
            //     // console.log("entered" + enteredpassword);
            //     console.log("actual" + response.data[0].password);
            //      if(this.state.password == response.data[0].password){
            //         console.log(global.user);
            //         global.user = this.state.username;
            //         console.log(global.user);
            //     }
            //  })
            //  .catch(function(error) {
            //     //  console.log("hi");
            //      console.log(error);
            //  })
    }

    onSubmit(e) {
        e.preventDefault();

        const newVendor = {
            username: this.state.username,
            password: this.state.password
        }

        // this.setState({
        //     username: '',
        //     password: ''
        // });

        // var enteredpassword = this.state.password;

        this.retrievePassword();

        

    }

    render() {
        return (
            
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.username}
                               onChange={this.onChangeUsername}
                               />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password" 
                               className="form-control" 
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               />  
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary"/>
                    </div>
                    <div className="form-group">
                        <Link to="/createvendor" className="nav-link">Don't have an account ? Register</Link>
                        {/* <a href="/"><p>Already have an account ? Login</p></a> */}
                    </div>
                    <div>
                        <p>{global.user}</p>
                    </div>
                </form>
            </div>
        )
    }
}