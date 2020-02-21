import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateVendor from './components/create-vendor.component';
import CreateCustomer from './components/create-customer.component';
import ListeditemList from './components/listproduct.component';
import ListAnItem from './components/listanitem.component';
import VendorLogin from './components/vendor-login.component';
import ViewItem from './components/customerviewproduct.component';
import CustomerLogin from './components/customer-login.component';
import ChooseProduct from './components/customerchooseproduct.component';
import ReadyDispatch from './components/readydispatch.component';
import DispatchRender from './components/dispatchrender.component';
import DisplayCart from './components/displaycart.component';
import RateProduct from './components/rateproduct.component';
import EditOrder from './components/editorder.component';


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
        <Route path="/ready" component={ReadyDispatch}/>
        <Route path="/dispatchrender" component={DispatchRender}/>
        <Route path="/displaycart" component={DisplayCart}/>
        <Route path="/rateproduct" component={RateProduct}/>
        <Route path="/editorder" component={EditOrder}/>
      </div>
    </Router>
  );
}

export default App;
