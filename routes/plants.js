const express = require('express');
const router = express.Router();
const { 
    getAllPlants, 
    addPlant, 
    getPlantsByGenus, 
    getPlantsByFamily, 
    searchPlantsByNames,
    getPaginatedPlants
} = require('../controllers/plantsController');


router.get('/', getAllPlants);
router.post('/', addPlant);
router.get('/genus/:genus', getPlantsByGenus);
router.get('/family/:family', getPlantsByFamily);
router.get('/search/:query', searchPlantsByNames);
router.get('/pages', getPaginatedPlants);

module.exports = router;