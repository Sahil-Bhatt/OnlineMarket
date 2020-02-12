const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
const PORT = 4000;
const userRoutes = express.Router();

let Vendor = require('./models/vendor');
let Customer = require('./models/customer');

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



// Getting a vendor by id
userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Vendor.findById(id, function(err, vendor) {
        res.json(vendor);
    });
});

app.use('/', userRoutes);

app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
});
