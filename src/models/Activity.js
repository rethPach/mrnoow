class Activity {

  constructor(country, attrs) {
    this.country = country;
    this.org = attrs[4];
    this.total = attrs[50];
    this.fecha = attrs[11].split('-')[0];
  }

  loadCache(cacheChunk) {
    if(!cacheChunk[this.country])
      cacheChunk[this.country] = {};

    if(!cacheChunk[this.country][this.fecha])
      cacheChunk[this.country][this.fecha] = {};
    
    if(!cacheChunk[this.country][this.fecha][this.org])
      cacheChunk[this.country][this.fecha][this.org] = this.total;
  }

}

module.exports = Activity;