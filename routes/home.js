const express = require("express");


const router = express.Router();

const homeController = require("../controllers/home");



router.get('/home', homeController.getHome);
router.get('/create/band', homeController.createBand);
router.post('/create/band', homeController.bandAdded);
router.get('/band/edit/(:id)', homeController.editBand);
router.post('/band/edit/(:id)', homeController.updateBand);
router.post('/band/delete/(:id)', homeController.deleteBand);



module.exports = router;