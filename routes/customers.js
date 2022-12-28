//loading the modules......
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Customer, customerJoiSchema } = require('../models/customer');
const express = require('express');
const router = express.Router();

//EXPRESS CRUD OPERATIONS.............
//getting customers from the database....
router.get('/api/customers', [auth, admin], async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});
//getting a single customer from our list....
router.get('/api/customers/:id', [auth, admin], async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    res.send(customer);
});

//adding customers to our database....
router.post('/api/customers', [auth, admin], async (req, res) => {
    const validateCustomer = customerJoiSchema.validate(req.body);
    if (validateCustomer.error) return res.status(400).send(validateCustomer.error.message);

    const customer = new Customer({
        isGold: req.body.isGold,
        customerName: req.body.customerName,
        number: req.body.number
    });
    const result = await customer.save();
    res.send(result);
    if (!customer) res.status(404).send('404-- The customer with the given id was not found.');
});
//updating information of ours customers in our database...
router.put('/api/customers/:id', [auth, admin], async (req, res) => {
    const validateCustomer = customerJoiSchema.validate(req.body);
    if (validateCustomer.error) return res.status(400).send(validateCustomer.error.message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        isGold: req.body.isGold,
        customerName: req.body.customerName,
        number: req.body.number
    }, { new: true });
    if (!customer) return res.status(404).send(' 404--The customer with the given ID was not found.');
    res.send(customer);
});

//deleting a customer in our database
router.delete('/api/customers/:id', [auth, admin], async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer) return res.status(404).send('404-- The Customer with the given ID was not found.');
    res.send(customer);
});

//adding our module to the index module.
module.exports = router;

