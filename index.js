/** @format */

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const datasetRoutes = require('./routes/dataset');

// MIDDELEWARE
app.use(bodyParser.json());
app.use(cors());

//DB CONNECTION
mongoose
	.connect('mongodb://localhost:27017/dataSet', {
		//dataSet is the name of database
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log('DB CONNECTED');
	});

//My ROUTES

app.use('/api', datasetRoutes);

//PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`app is running at ${port}`);
});
