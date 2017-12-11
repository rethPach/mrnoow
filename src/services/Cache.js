const ActivitieRepo = require("../repositories/ActivityRepo");
const CacheFile = require("./CacheFile");
const q = require('q');

class Cache {

  constructor() {
    this.activitiesRepo = new ActivitieRepo();
    this.cacheFile = new CacheFile();
    this.q = q;
  }

  getData(command) {
    return this.cacheFile.read().then( (cache) => {
      if( this.has(cache, command.country) ) 
        return q.resolve(cache.filter((country)=>country.hasOwnProperty(command.country))[0]);
      
      return this.activitiesRepo
        .byCountry(command.country)
        .then(this.load({}).bind(this));
    });
  }

  has(cache, key) {
    return cache.filter((item, keyFilter) => {
      return item.hasOwnProperty(key);
    }).length > 0;
  }

  load(cacheChunk) {
    return function(activities) {
      activities.forEach((activity)=>{
        activity.loadCache(cacheChunk);
      });
      return this.save(cacheChunk);
    }
  }

  save(cacheChunk) {
    return this.cacheFile.write(cacheChunk);
  }
}

module.exports = Cache;