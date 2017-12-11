const Cache = require('../services/Cache');
const q = require('q');
const underscore = require('underscore');

class OrganizacionRepo {

	constructor() {
		this.cache = new Cache();
	}

	byCountry(country) {
		return this.cache
			.getData({country: country})
			.then(this.mapOrg(country));
	}

	byCommand(command) {
		return this.byCountry(command.country)
		.then(this.filterByCommand(command));
	}

	filterByCommand(command) {
		return function(orgCollection) {
			let 
				result = {}, 
				startDate = command.start_date || 2012,
				endDate = command.end_date || 2017;

			for(let fecha in orgCollection[command.country]) {
				if(fecha >= startDate && fecha <= endDate)
					result[fecha] = orgCollection[command.country][fecha];
			}

			return q.resolve(result);
		}
	}

	mapOrg(country) {
		return function(cacheOrg) {
			for(let fecha in cacheOrg[country]) {
				let sortOrg = underscore
					.pairs(cacheOrg[country][fecha])
					.sort((a, b)=>{ return (Number(a[1]) < Number(b[1])) ? -1 : 1; });
				cacheOrg[country][fecha] = underscore.object(sortOrg);
			}
			return cacheOrg;
		};
	}
}

module.exports = OrganizacionRepo;