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
let Productbuy = require('./models/productbuy');

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

// Sample
userRoutes.route('/getorderdetails').post(function(req, res) {
    let orderupdate = new Listeditem(req.body);
    let pro = orderupdate.productname;
    let sell = orderupdate.sellername;
    Listeditem.find({"productname":pro,"sellername":sell},function(err, vendors) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendors);
        }
    });
});



// Getting all the products listed for Customer view
userRoutes.route('/getproductlist').get(function(req, res) {
    Listeditem.find({"dispatch_status" : "Listed"},function(err, vendors) {
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
    Listeditem.find({"sellername":name, "dispatch_status" : "Listed"},function(err, vendors) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendors);
        }
    });
});

// Getting all the READY TO DISPATCH products listed by a particular vendor
userRoutes.route('/getreadyproducts/:name').get(function(req, res) {
    let name = req.params.name;
    Listeditem.find({"sellername":name , "dispatch_status" : "Ready"},function(err, vendors) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendors);
        }
    });
});

// Getting all the DISPATCHED products listed by a particular vendor
userRoutes.route('/getdispatchedproducts/:name').get(function(req, res) {
    let name = req.params.name;
    Listeditem.find({"sellername":name , "dispatch_status" : "Dispatched"},function(err, vendors) {
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


//Adding a Purchase
userRoutes.route('/addpurchase').post(function(req, res) {
    let purchase = new Productbuy(req.body);
    purchase.save()
        .then(customer => {
            res.status(200).json({'Purchase': 'Purchase recorded successfully'});
        })
        .catch(err => {
            res.status(400).send('Error');
        });
});


// Getting all the products listed for Customer view
userRoutes.route('/getpurchase/:name').get(function(req, res) {
    let name = req.params.name;
    Productbuy.find({"buyername" : name},function(err, vendors) {
        if (err) {
            console.log(err);
        } else {
            res.json(vendors);
        }
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
userRoutes.route('/cancelproduct').post(function(req, res) {
    let cancelpkg = new Listeditem(req.body);
    let item = cancelpkg.productname;
    let seller = cancelpkg.sellername;
    Listeditem.updateMany({"productname":item},{ $set: {"dispatch_status": "Cancelled"} },function(err, vendors) {
        if (err) throw err;
        console.log("Listeditem updated");
    });
    Productbuy.updateMany({"productname":item, "sellername" : seller},{ $set: {"dispatch_status": "Cancelled"} },function(err, vendors) {
        if (err) throw err;
        console.log("Productbuy updated");
    });
});


// Dispatching a product
userRoutes.route('/dispatchproduct').post(function(req, res) {
    let dispatchpkg = new Listeditem(req.body);
    let item = dispatchpkg.productname;
    let seller = dispatchpkg.sellername;
    var myquery1 = { "productname" : item };
    var myquery2 = { "productname": item, "sellername" : seller };
    var newvalues = { $set: {"dispatch_status": "Dispatched"} };
    Listeditem.updateMany(myquery1,newvalues,function(err, vendors) {
        if (err) throw err;
        console.log("Listeditem updated");
    });
    Productbuy.updateMany(myquery2,newvalues,function(err, vendors) {
        if (err) throw err;
        console.log("Productbuy updated");
    });
});


// Updating vendor ordered so far
userRoutes.route('/vendororder').post(function(req, res) {
    let pro = new Listeditem(req.body);
    console.log(pro);
    if(pro.ordered_so_far == pro.minimum_quantity)
    {
        pro.dispatch_status = "Ready";
    }
    var myquery = {"productname": pro.productname, "sellername" : pro.sellername};
    var newvalues = {$set:  {"ordered_so_far" : pro.ordered_so_far, "dispatch_status" : pro.dispatch_status, "number_of_buyers" : pro.number_of_buyers}};
    Listeditem.updateMany(myquery,newvalues,function(err, vendors) {
        if (err) throw err;
        console.log("Listeditem updated");
    });
    var nesvalues = {$set : {"dispatch_status" : pro.dispatch_status}};
    console.log(pro.dispatch_status);
    Productbuy.updateMany(myquery,nesvalues,function(err, vendors) {
        if (err) throw err;
        console.log("Productbuy updated");
    });
});


// Adding reviews and ratings
userRoutes.route('/reviewproduct/:name').post(function(req, res) {
    let pro = new Listeditem(req.body);
    console.log(pro);
    let buyername = req.params.name;
    var myquery1 = {"productname": pro.productname, "sellername" : pro.sellername};
    var newvalues = {$set:  {"sum_of_ratings" : pro.sum_of_ratings}};
    Listeditem.updateMany(myquery1,newvalues,function(err, vendors) {
        if (err) throw err;
        console.log("Listeditem updated");
    });
    var myquery2 = {"productname": pro.productname, "sellername" : pro.sellername, "buyername" : buyername}
    console.log("Rating " + pro.rating);
    console.log("Review " + pro.review);
    var nesvalues = {$set : {"rating" : pro.rating, "review" : pro.review}};
    console.log(pro.dispatch_status);
    Productbuy.updateMany(myquery2,nesvalues,function(err, vendors) {
        if (err) throw err;
        console.log("Productbuy updated");
    });
});



app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
