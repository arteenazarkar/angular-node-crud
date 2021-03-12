const express = require('express');
const app = express();

const categoryRoute = express.Router();
// let Category = require('../models/category.model');

const db = require("../models");
const Category = db.category;
const Op = db.Sequelize.Op;

// Get all category
categoryRoute.get("/", (req, res) => {
  Category.findAll({ where: null })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories."
      });
    });
});

// Get a category by id
categoryRoute.route('/get-category/:id').get((req, res) => {
  const id = +req.params.id;
  Category.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving category with id=" + id
      });
    });
})

// add category
categoryRoute.route('/add-category').post((req, res, next) => {

  // Validate request
  if (!req.body.categoryName) {
    res.status(400).send({
      message: "Category name can not be empty!"
    });
    return;
  }

  const category = {
    categoryId: +req.body.categoryId,
    categoryName: req.body.categoryName
  };

  Category.create(category)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Category."
      });
    });
});

// Update category
categoryRoute.route('/update-category/:id').put((req, res, next) => {
  const id = +req.params.id;

  Category.update(req.body, {
    where: { categoryId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Category was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Category with id=${id}. Maybe Category was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Category with id=" + id
      });
    });
})



// Delete product
categoryRoute.route('/delete-category/:id').delete((req, res, next) => {
  const id = +req.params.id;

  Category.destroy({
    where: { categoryId: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Category was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Category with id=" + id
      });
    });
})

module.exports = categoryRoute;