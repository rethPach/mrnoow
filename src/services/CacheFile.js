const fs = require('fs');
const path = require('path');
const q = require('q');

class CacheFile {

	constructor() {
		this.fs = fs;
		this.setFilePath();
		this.q = q;
	}

	setFilePath() {
		this.filePath = path.basename( '../cache.json');
	}

	read() {
		return this.q.resolve(require('../cache.json'));
	}

	write(chunk) {
		let self, deferred;
		self = this, 
		deferred = this.q.defer();

		self.read().then((cache)=>{
			cache.push(chunk);
			self.fs.writeFile(
				self.filePath, JSON.stringify(cache), 
				'utf8', self.onWriteEnd(deferred, chunk)
			);
		});

		return deferred.promise;

	}

	onWriteEnd(deferred, chunkCache) {
		return function(err) {
			if(err) return deferred.reject(err);
			return deferred.resolve(chunkCache);
		}
	}

}

module.exports = CacheFile;