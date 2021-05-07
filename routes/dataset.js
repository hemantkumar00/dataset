/** @format */

var express = require('express');
var router = express.Router();
const {
	create,
	createMany,
	getDataByCaseId,
	getCase,
	findAll,
	updateCase,
	removeCase,
	jsonfile,
} = require('../controllers/dataset');

//params to find case according to Case_id
router.param('caseId', getDataByCaseId);

//These are post route
router.post('/create', create);
router.post('/createMany', createMany);

//This is the route for jsonfile dataset.json to inset whole file at once
router.post('/jsonFile', jsonfile);

// To get Individual case on the bases of case id
router.get('/getCase/:caseId', getCase);
router.get('/getAll', findAll);

// Update route for individual case
router.put('/updateCase/:caseId', updateCase);

//Delete individual case on the bases of case id
router.delete('/deleteCase/:caseId', removeCase);

//exporting the router
module.exports = router;
