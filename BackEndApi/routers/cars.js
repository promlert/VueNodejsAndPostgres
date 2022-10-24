const express = require('express');
const router = express.Router();

const cars = require('../service/cars')

router.get('/', async function(req, res, next) {
    // #swagger.tags = ['Cars']
    // #swagger.description = 'Endpoint to get cars.' 
    try {
        res.json(await cars.getAll());
      } catch (err) {
        console.error(`Error while getting car `, err.message);
        res.status(err.statusCode || 500).json({'message': err.message});
      }
})

router.get('/:id', async function(req, res, next) {
    // #swagger.tags = ['Cars']
    // #swagger.description = 'Endpoint to get car by id.' 
    try {
        res.json(await cars.get(req.params));
      } catch (err) {
        console.error(`Error car not found  `, err.message);
        res.status(err.statusCode || 500).json({'message': err.message});
      }
})
router.get('/found/:name', async function(req, res, next) {
    // #swagger.tags = ['Cars']
    // #swagger.description = 'Endpoint to get car by id.' 
    try {
        res.json(await cars.getByName(req.params));
      } catch (err) {
        console.error(`Error car not found  `, err.message);
        res.status(err.statusCode || 500).json({'message': err.message});
      }
})
router.post('/found', async function(req, res, next) {
    // #swagger.tags = ['Cars']
    // #swagger.description = 'Endpoint to get car by id.' 
    try {
        res.json(await cars.getByName(req.body));
      } catch (err) {
        console.error(`Error car not found  `, err.message);
        res.status(err.statusCode || 500).json({'message': err.message});
      }
})
router.post('/' ,async function(req, res, next) {
     // #swagger.tags = ['Cars']
    // #swagger.description = 'Endpoint to create car.' 
    try {
        res.status(201).json(await cars.create(req.body));
      } catch (err) {
        console.error(`Error while posting cars `, err.message);
        res.status(err.statusCode || 500).json({'message': err.message});
      }
})
router.put('/' ,async function(req, res, next) {
    // #swagger.tags = ['Cars']
   // #swagger.description = 'Endpoint to update car.' 
   try {
       res.status(201).json(await cars.update(req.body));
     } catch (err) {
       console.error(`Error while posting cars `, err.message);
       res.status(err.statusCode || 500).json({'message': err.message});
     }
})
router.delete('/:id', async function(req, res, next) {
    // #swagger.tags = ['Cars']
    // #swagger.description = 'Endpoint to get car by id.' 
    try {
        res.json(await cars.delecar(req.params));
      } catch (err) {
        console.error(`Error car not found  `, err.message);
        res.status(err.statusCode || 500).json({'message': err.message});
      }
})
module.exports = router;