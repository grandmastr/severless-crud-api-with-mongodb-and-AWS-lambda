const mongoose = require('mongoose');
const Promise = require('bluebird');
const ProductModel = require('./model/Product.js');

mongoose.Promise = Promise;

require('dotenv').config();
const mongoString = process.env.MONGODB_IRL;

const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { 'Content-Type': 'text/plain' },
  body: message || 'Are you sure you are doing the correct thing? Coz I\'m not',
});

const dbExecute = (db, fn) => db.then(fn).finally(() => console.log("Database action done"));

function dbConnectAndExecute(dbUrl, fn) {
  return dbExecute(mongoose.connect(dbUrl, { useNewUrlParser: true }), fn);
}


// Create
module.exports.createProduct = (event, context, callback) => {
  const { name, price, description } = event.body;
  
  const product = new ProductModel({
    name,
    price,
    description
  });

  dbConnectAndExecute(mongoString, () => (
    product
      .save()
      .then(() => callback(null, {
        statusCode: 200,
        body: JSON.stringify({ id: product.id }),
      }))
      .then(() => console.log(`${product.name} added successfully`))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
};

// Read
module.exports.products = (event, context, callback) => {
  dbConnectAndExecute(mongoString, () => (
    ProductModel
      .find({})
      .then(product => callback(null, {statusCode: 200, body: product}))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
};

// Update
module.exports.updateProduct = (event, context, callback) => {
  const { name, description } = event.body;
  const id = event.pathParameters.id;
  
  dbConnectAndExecute(mongoString, async () => {
    try {
      const product = await ProductModel.findOne({_id: id});
      const update = {name, description};
      
      await product.updateOne(update);
      callback(null, {
        statusCode: 200,
        body:  `${name} updated successfully`
      })
    } catch(err) {
      console.error(err);
    }
  });
};

// Delete
module.exports.deleteProduct = (event, context, callback) => {
  dbConnectAndExecute(mongoString, () => (
    ProductModel
      .remove({_id: event.pathParameters.id})
      .then(() => callback(null, {statusCode: 200, body: 'Entry Deleted, Ok'}))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
};
