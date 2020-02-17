const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let Vendor = require('./models/vendor');
let Customer = require('./models/customer');
let Listeditem = require('./models/listeditem');

app.use(cors());
app.use(bodyParser.json());

// Connection to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/vendors', { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established succesfully.");
})

// API endpoints

// Getting all the vendors
userRoutes.route('/').get(function(req, res) {
    Vendor.find(function(err, vendors) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendors);
        }
    });
});

// Getting all the customers
userRoutes.route('/getcustomer').get(function(req, res) {
    Customer.find(function(err, vendors) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendors);
        }
    });
});


// Getting all the products listed for Customer view
userRoutes.route('/getproductlist').get(function(req, res) {
    Listeditem.find(function(err, vendors) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendors);
        }
    });
});



// Getting all the products listed by a particular vendor
userRoutes.route('/getproducts/:name').get(function(req, res) {
    let name = req.params.name;
    Listeditem.find({"sellername":name},function(err, vendors) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendors);
        }
    });
});


// Getting a user by id
userRoutes.route('/:name').get(function(req, res) {
    let name = req.params.name;
    user = Vendor.find({"username": name});
    res.json(user);
});



// Adding a new vendor
userRoutes.route('/addvendor').post(function(req, res) {
    let vendor = new Vendor(req.body);
    vendor.save()
        .then(vendor => {
            res.status(200).json({'Vendor': 'Vendor added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// Adding a new customer
userRoutes.route('/addcustomer').post(function(req, res) {
    let customer = new Customer(req.body);
    customer.save()
        .then(customer => {
            res.status(200).json({'Customer': 'Customer added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});


// Adding a new product
userRoutes.route('/vendoraddproduct').post(function(req, res) {
    let item = new Listeditem(req.body);
    item.save()
        .then(item => {
            res.status(200).json({'Product': 'Product added successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});

// // Vendor password check
userRoutes.route('/vpwdcheck/:name').get(function(req,res){
    let name = req.params.name;
    Vendor.find({"username":name},function(err, vendors) {
        res.json(vendors);
    });
});

// // Customer password check
userRoutes.route('/cpwdcheck/:name').get(function(req,res){
    let name = req.params.name;
    Customer.find({"username":name},function(err, vendors) {
        res.json(vendors);
    });
});


// Cancelling a product
userRoutes.route('/cancelproduct/:productname').post(function(req, res) {
    let item = req.params.productname;
    // let seller = req.params.sellername;
    // console.log(item);
    Listeditem.deleteOne({"productname":item},function(err, vendors) {
        if (err) throw err;
        console.log("1 document deleted");
    });
});


// Dispatching a product
userRoutes.route('/dispatchproduct/:productname').post(function(req, res) {
    // console.log(req.body);
    let item = req.params.productname;
    // console.log(item);
    // let seller = req.body.sellername;
    // console.log(seller);
    // console.log(item);
    var myquery = { "productname": item };
    var newvalues = { $set: {"dispatch_status": "Dispatched"} };
    Listeditem.updateOne(myquery,newvalues,function(err, vendors) {
        if (err) throw err;
        console.log("1 document updated");
    });
});

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
