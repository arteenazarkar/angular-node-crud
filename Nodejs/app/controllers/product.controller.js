const express = require('express');
const { category } = require('../models');
const app = express();

const productRoute = express.Router();

const db = require("../models");
const Product = db.products;
const Category = db.category;
const Op = db.Sequelize.Op;


Product.belongsTo(Category, { targetKey: 'categoryId', foreignKey: 'categoryId' });


// Get all product
productRoute.get("/", (req, res) => {
  Product.findAll({
    include: [{
      model: Category
    }]
  })

    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
});

// Get a product by id
productRoute.route('/get-product/:id').get((req, res) => {
  const id = +req.params.id;
  Product.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving product with id=" + id
      });
    });
})

// add product
productRoute.route('/add-product').post((req, res, next) => {

  // Validate request
  if (!req.body.productName || !req.body.categoryId) {
    res.status(400).send({
      message: "Product name or category can not be empty!"
    });
    return;
  }

  const product = {
    productId: +req.body.productid,
    productName: req.body.productName,
    categoryId: +req.body.categoryId
  };

  Product.create(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
});

// Update product
productRoute.route('/update-product/:id').put((req, res, next) => {
  const id = +req.params.id;

  Product.update(req.body, {
    where: { productId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
})

// Delete product
productRoute.route('/delete-product/:id').delete((req, res, next) => {
  const id = +req.params.id;

  Product.destroy({
    where: { productId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
})

module.exports = productRoute;