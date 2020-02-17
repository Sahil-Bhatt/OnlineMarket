import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

import CreateVendor from './components/create-vendor.component';
import CreateCustomer from './components/create-customer.component';
import ListeditemList from './components/listproduct.component';
import ListAnItem from './components/listanitem.component';
import VendorLogin from './components/vendor-login.component';
import ViewItem from './components/customerviewproduct.component';
import CustomerLogin from './components/customer-login.component';
import ChooseProduct from './components/customerchooseproduct.component';


function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link to="/" className="navbar-brand">OnlineMarket</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/createvendor" className="nav-link">Vendor</Link>
              </li>
              <li className="navbar-item">
                <Link to="/createcustomer" className="nav-link">Customer</Link>
              </li>
              {/* <li className="navbar-item">
                <Link to="/listproduct" className="nav-link">Products</Link>
              </li>
              <li className="navbar-item">
                <Link to="/listme" className="nav-link">List-item</Link>
              </li>
              <li className="navbar-item">
                <Link to="/viewitems" className="nav-link">View-items</Link>
              </li> */}
            </ul>
          </div>
        </nav>

        <br/>
        <Route path="/createvendor" component={CreateVendor}/>
        <Route path="/createcustomer" component={CreateCustomer}/>
        <Route path="/listproduct" component={ListeditemList}/>
        <Route path="/listme" component={ListAnItem}/>
        <Route path="/vendorlogin" component={VendorLogin}/>
        <Route path="/viewitems" component={ViewItem}/>
        <Route path="/customerlogin" component={CustomerLogin}/>
        <Route path="/custchooseproduct" component={ChooseProduct}/>
      </div>
    </Router>
  );
}

export default App;
