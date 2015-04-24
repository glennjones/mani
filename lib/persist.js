

// TODO write client-side tests for persist module

/*var localforage			= require('localforage');



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
			callback(err, []);
		}
	}

};


Persist.prototype.save = function (callback) {
	var name = (this.options.name)? this.options.name + '-documents' : 'documents';

	localforage.setItem(name, this.index.documents.items).then(function(value) {
	    console.log('document collection was stored: ' + value.length);
	    callback(null, value); 
	}, function(err) {
	    console.error('document collection store errored: ' +  error);
	    callback(err, null) 
	});

}


Persist.prototype.load = function (callback) {
	var name = (this.options.name)? this.options.name + '-documents' : 'documents';

	localforage.getItem(name).then(function(value) {
	    console.log('document collection was restored: ' + value.length);
	    index.add(value);
	    callback(null, value) 
	}, function(err) {
	    console.error('document collection restored errored: ' +  error);
	    callback(err, null) 
	});

}


Persist.prototype.removeAll = function (callback) {
	var name = (this.options.name)? this.options.name + '-documents' : 'documents';

	localforage.removeItem(name).then(function(value) {
	    console.log('document collection was removed: ' + value.length)
	    callback(null, value) 
	}, function(err) {
	    console.error('document collection remove errored: ' +  error);
	    callback(err, null) 
	});

}







module.exports = Persist
*/