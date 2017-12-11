const OrganizacionResource = require('./handlers/OrganizacionResource');
const underscore = require('underscore');

let anResource = new OrganizacionResource();
let commandTest = {
	country: process.argv[2] && process.argv[2].toUpperCase() || 'SD',
	start_date: process.argv[3] || '2012',
	end_date: process.argv[4] || '2016'
}

anResource.index(commandTest).then((resultadoDeLaPrueba)=>{
	console.log(resultadoDeLaPrueba);
});