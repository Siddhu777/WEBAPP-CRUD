const express = require('express')
const router = express.Router()

const custController = require('../controllers/customer-controller')

//Get state city by Postcode
// router.post('/:id', PostcodeController.)
router.post("/insertCustomer", custController.addCustomer);
router.get("/selectCustomers", custController.getCustomers);
router.get("/selectCustomerById/:id", custController.getCustomer);
router.post("/deleteCustomer/:id", custController.deleteCustomer);
router.post("/updateCustomer/:id", custController.updateCustomer);


module.exports = router;