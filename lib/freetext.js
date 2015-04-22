var Lunr		= require('lunr'),
	_			= require('lodash'),
	utilities	= require('./utilities');


// create a documents collection that encapsules lunr interface
FreeText = function( options ){
	this._lunrIndex = null;
	this.options = {};

	if(options && options.text){
		this.options.text = options.text
		this._lunrIndex = this._getLunrIndex(this.options);
	}
};


FreeText.prototype.search = function (options) {
	var ftsResults = null;

	// excute free text search
	if(options && options.text){
		ftsResults = this._lunrIndex.search( options.text );
	}

	// format [{"ref":"1","score":0.30815769789216485}]
	var ftsResults = ftsResults.map(function(item){ 
	   item.ref = parseInt(item.ref,10);
	   return item;
	});

	return _.sortByAll(ftsResults, ['score', 'ref']); 
}


// creates a lunr schema function and returns lunr index object
FreeText.prototype._getLunrIndex = function (options) {
	// build function based config from JSON
	if(options && options.text){
		var config = (function () {
			var self = this;
			if(options.text){
				options.text.forEach(function(item, i) {
					if(item.boost){
						self.field('p'+i, {boost: item.boost});
					}else{
						self.field('p'+i);
					}
				})
			}
			this.ref('id');
		})
		return Lunr(config);
	}else{
		return null;
	}
}




// flatten an item for use with lunr based passed options
FreeText.prototype._flatten = function ( item ) {
	var out = {}
	if(this.options.text){
		this.options.text.forEach(function(prop, i) {
			var val = utilities.reach(item, prop.path);
			if(val){
				out['p'+i] = val;
			} 
		})
		out.id = item.id;
	}
	return out;
}


// add document to collection
FreeText.prototype.add = function (doc) {
	if(this._lunrIndex){
		// flatten the object structure based on options.fields;
    	this._lunrIndex.add( this._flatten(doc))
	}
	return doc;
}

/*
// remove document from collection
Documents.prototype.remove = function (doc ) {
    return this._lunrIndex.remove( doc )
}

// update document from collection
Documents.prototype.update = function (doc ) {
    return this._lunrIndex.update( doc )
}

// return collection as JSON
Documents.prototype.toJSON = function () {
    return this._lunrIndex.toJSON();
}


Documents.prototype.count = function () {
    return this.items.length;
}
*/






module.exports = FreeText;