const OrganizacionRepo = require('../repositories/OrganizacionRepo');

class OrganizacionResource {

	constructor() {
		this.organizacionRepo = new OrganizacionRepo();
	}

	index(command) {
		return this.organizacionRepo.byCommand(command);
	}


}

module.exports = OrganizacionResource;