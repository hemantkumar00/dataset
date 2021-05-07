/** @format */

const Dataset = require('../models/dataset');

const Datasets = require('../dataset.json');

//This is to send all data from JSON file but we have to remove required flag from all the mendetory fields
//because in data some of case do not have requiredfields
exports.jsonfile = (req, res) => {
	Dataset.insertMany(Datasets, (err, data) => {
		if (err) throw err;
		console.log(`inserted: ${data.insertedCount} rows`);
	});
};

//Params to find data on the bases of case_id to use later to update data and delete or get individual data
exports.getDataByCaseId = (req, res, next, id) => {
	Dataset.findOne({ case_id: id }).exec((err, data) => {
		if (err || !data) {
			return res.status(400).json({
				error: 'No data was found in DB',
			});
		}
		req.profile = data;
		next();
	});
};

//this is create controller to create data
exports.create = (req, res) => {
	const dataset = new Dataset(req.body);
	dataset.save((err, data) => {
		if (err) {
			return res.status(400).json({
				err: 'Not able to save data to database',
			});
		}
		res.json(data);
	});
};

//this is to create many dataset at same time
exports.createMany = (req, res) => {
	Dataset.insertMany(req.body)
		.then((datas) => {
			res.status(201).send(datas);
		})
		.catch((err) => {
			res.status(400).json({
				err: 'Something went wrong might be case_id is same',
			});
		});
};

//get controller to fetch single case
exports.getCase = (req, res) => {
	return res.json(req.profile);
};

//to fetch all the cases
exports.findAll = (req, res) => {
	Dataset.find((err, data) => {
		if (err) {
			return res.status(400).json({
				err: 'Not able to find data to database',
			});
		}
		res.json(data);
	});
};

//to fetch and update single case
exports.updateCase = (req, res) => {
	Dataset.findOneAndUpdate(
		{ case_id: req.profile.case_id },
		{ $set: req.body },
		{ new: true, useFindAndModify: false },
		(err, data) => {
			if (err || !data) {
				return res.status(400).json({
					error: ' Unable to update your data',
				});
			}

			res.json(data);
		}
	);
};

// to fetch single case and delete the case
exports.removeCase = (req, res) => {
	const data = req.profile; //saved this to show in future that which case is deleted from data base
	data.remove((err, data) => {
		if (err) {
			return res.status(400).json({
				error: 'Sorry some thing went wrong not able to delete data',
			});
		}
		res.json({
			message: `SUCCESSFULLY deleted category is ${data.case_id}`,
		});
	});
};
