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
  // const data = JSON.stringify(event.body);

  const product = new ProductModel({
    name: "Rollers",
    price: 1200,
    description: "Bla bla bla"
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
module.exports.product = (event, context, callback) => {
  dbConnectAndExecute(mongoString, () => (
    ProductModel
      .find({_id: event.pathParameters.id})
      .then(user => callback(null, {statusCode: 200, body: JSON.stringify(user)}))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
};

// Update
module.exports.updateProduct = (event, context, callback) => {
  // const data = JSON.stringify(event.body);
  console.log(event);
  // const id = event.pathParameters.id;

  const product = new ProductModel({
    name: SkateBoards,
    description: "James Olsen",
    price: 1100
  });

  dbConnectAndExecute(mongoString, () => (
    ProductModel.findByIdAndUpdate(id, product)
      .then(() => callback(null, { statusCode: 200, body: JSON.stringify('Ok') }))
      .catch(err => callback(err, createErrorResponse(err.statusCode, err.message)))
  ));
};

// Delete
module.exports.deleteProduct = (event, context, callback) => {
  dbConnectAndExecute(mongoString, () => (
    ProductModel
      .remove({_id: event.pathParameters.id})
      .then(() => callback(null, {statusCode: 200, body: JSON.stringify('Ok')}))
      .catch(err => callback(null, createErrorResponse(err.statusCode, err.message)))
  ));
};
