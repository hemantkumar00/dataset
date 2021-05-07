/** @format */

var mongoose = require('mongoose');

const reqNumber = {
	type: Number,
};

//tumor_site, BMI, height_in_cm, width_in_cm are required field but when we want to parse json file
//then we have to remove required flag because some of dataset do not have these required field
// to save all the data we have to remove required flag
//These are not required right know

var datasetSchema = new mongoose.Schema(
	{
		case_id: {
			type: String,
			required: true,
			unique: true,
		},
		tumor_site: {
			type: String,
		},
		BMI: reqNumber,
		height_in_cm: reqNumber,
		weight_in_kg: reqNumber,
	}, //These are required field
	{ strict: false }, // This allows all data to come in because every case has different data.
	{ timestamps: true }
);

module.exports = mongoose.model('Dataset', datasetSchema);
