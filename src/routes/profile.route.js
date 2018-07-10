const express = require('express');
const joi = require('joi');
const catalogController = require('../controllers/catalog.controller');

const router = express.Router();

const paramSchema = {
  createCatalog: {
    body: {
      name: joi.string(),
      phoneNum: joi.number(),
      avator: joi.string(),
      age: joi.number(),
      address: joi.string(),
      birthday: joi.string(),
      email: joi.string().email(),
      company: joi.string()
    }
  },

  updateCatalog: {
    body: {
      name: joi.string(),
      phoneNum: joi.number(),
      avator: joi.string(),
      age: joi.number(),
      address: joi.string(),
      birthday: joi.string(),
      email: joi.string().email(),
      company: joi.string()
    },
    params: {
      catalogId: joi.required()
    }
  }
}

router.route('/')
  .get(catalogController.getList)
  .post(paramSchema.createCatalog, catalogController.create);

router.route('/:catalogId')
  .get(catalogController.getItemById)
  .put(paramSchema.updateCatalog, catalogController.update)
  .delete(catalogController.removeItem)

router.param('catalogId', catalogController.itemLoading);

module.exports = router;
