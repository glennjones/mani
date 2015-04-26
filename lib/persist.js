
// TODO write client-side tests for persist module

var localforage     = require('localforage');


// create a documents collection that encapsules lunr interface
Persist = function( index, options, callback ){

  var self = this;
  this.options = (options)? options : {};

  if(!this.options.name ){
    this.options.name = 'mani';
  }
  if(!this.options.auto ){
    this.options.auto = false;
  }

  this.index = index;
  localforage.config({
      'name': self.options.name + '-collection'
  });

  // capture all event and if auto true save changes
  this.index.on('add', 'remove', 'update', (function () {
    if(self.options.auto === true){
      //self.save(function(){})
    }
  }));


  // if auto is true at start load current items into index
  if(this.options.auto === true){
    this.load(function(err, items){
      if(callback){
        callback(err, items)
      }
    });
  }else{
    if(callback){
      callback(null, []);
    }
  }

};


Persist.prototype.save = function (callback) {
  var name = (this.options.name)? this.options.name + '-documents' : 'documents';

  // save full docuemnts
  var pack = {
    items: this.index.documents.items
  }
  // save free text index dump from lunr
  if(this.index._freetext._lunrIndex){
    pack.ftsIndex = this.index._freetext.toJSON()
  }

  localforage.setItem(name, pack).then(function(value) {
      console.log('document collection was stored: ' + value.length);
      callback(null, value); 
  }, function(err) {
      console.error('document collection store errored: ' +  error);
      callback(err, null) 
  });

}


Persist.prototype.load = function (callback) {
  var self = this,
    name = (this.options.name)? this.options.name + '-documents' : 'documents'



  localforage.getItem(name).then(function(pack) {
    console.log('document collection was restored: ' + pack.items.length);

    // load free text index dump into lunr
    if(self.index._freetext 
      && self.index._freetext._lunrIndex 
      && pack.ftsIndex){

    	console.log(JSON.stringify(pack.ftsIndex))
      self.index._freetext.fromJSON(pack.ftsIndex)
    }
    // load full documents
    index.add(pack.items, {ftsIndex: false});


    callback(null, pack.items) 
  }, function(err) {
      console.error('document collection restored errored: ' +  error);
      callback(err, null) 
  });



}




Persist.prototype.removeAll = function (callback) {
  var name = (this.options.name)? this.options.name + '-documents' : 'documents';

  localforage.removeItem(name).then(function() {
      console.log('document collection was removed')
      callback(null, []) 
  }, function(err) {
      console.error('document collection remove errored: ' +  error);
      callback(err, null) 
  });

}

module.exports = Persist;