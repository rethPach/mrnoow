const request = require('request');
const csv = require('csvtojson');
const q = require('q');
const Activity = require('../models/Activity');

class ActivityRepo {

	constructor() {
		this.request = request;
		this.csv = csv;
		this.deferred = q.defer();
		this.data = [];
	}

	byCountry(country) {
		return this.executeRequestByCountry(country);
	}

	executeRequestByCountry(country) {
		this.csv({noheader:false}).fromStream(this.createRequest(country))
		.on('csv', this.addActivity(country).bind(this))
		.on('done', this.responseActivityData.bind(this));
		return this.deferred.promise;
	}

	createRequest(country) {
		let url = [
			"http://datastore.iatistandard.org/",
			"api/1/access/activity.csv?",
			"recipient-country=", country,
			"&stream=True"
		].join('');
		return this.request.get(url);
	}

	addActivity(country) {
		return function(csvRow) {
			this.data.push(new Activity(country, csvRow));
		}
	}

	responseActivityData(error) {
		if(error) throw error;
		this.deferred.resolve(this.data);
	}
}

module.exports = ActivityRepo;