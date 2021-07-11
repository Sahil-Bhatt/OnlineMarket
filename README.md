# SOUK: An Online Marketplace Web App  

*Souk* is a web application for all your buying and selling needs.  
Built using the MERN Stack(MongoDB, Express, React, NodeJS), Souk provides a user-friendly  
platform for both vendors and customers to sell and purchase products respectively.  

![Souk.jpg](https://github.com/bhattsahil1/Souk/blob/master/img/souk.png?raw=true)  

Some of the key highlights of Souk are:  
1. **Vendor management**- Vendors, after authentication, can list, dispatch and cancel products.  
2. **Customer management**- Customers, after authentication, can view the list of items available on the marketplace.  
3. **Product comparison**- Apart from being able to search for products by keyword, customers can also sort the products based on price and reviews from other customers.  
4. **Cart**- Customers can also see the products they have added to their cart, and edit/cancel their orders.  
5. **Ratings and Feedback** - Customers can leave ratings and reviews for the products they've purchased, which in turn would be visible to the vendors on their portals.  


## Setup

#### Node

For Linux:
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

For Mac:
```
brew install node
```

#### MongoDB

Install the community edition [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).

#### React

```
npm install -g create-react-app
```

To create a new React app:
```
create-react-app name_of_app
```

To run the app, cd into the directory and do:
```
npm start
```

## Running the code

Run Mongo daemon:
```
sudo mongod
```
Mongo will be running on port 27017.

Run Express:
```
cd backend/
npm start
```

Run React:
```
cd frontend
npm start
```
Navigate to localhost:3000/ in your browser.

