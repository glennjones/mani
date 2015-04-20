var _			= require('lodash'),
	utilities	= require('./utilities');
	

// create a documents collection that encapsules lunr interface
Documents = function( options ){
	this.items = [];
	this._fields = [];
	this._idCount = 0;
	this._lunrIndex = null;
	this.options = {};

	if(options){
		this.options = options;
		if(options.lunrIndex){
			this._lunrIndex = options.lunrIndex;
		}
		if(options.textProperties){
			this._textProperties = options.textProperties;
		}
	}
};


// flatten an item for use with lunr based passed options
Documents.prototype.flatten = function ( item ) {
	var out = {}
	if(this._textProperties){
		this._textProperties.forEach(function(prop, i) {
			var val = utilities.reach(item, prop.path);
			if(val){
				out['p'+i] = val;
			} 
		})
		out.id = item.id;
	}
	return out;
}



// return document by id
Documents.prototype.getItemById = function ( id ) {
	var out = null,
		i = this.items.length,
		x = 0;

	while (x < i) {
	    if(this.items[x].id === id){
	    	var out = _.cloneDeep(this.items[x]);
	    	break;
	    }
	    x++;
	}
	return out;
}

// return items based on fts results
Documents.prototype.getItemsFromResults = function ( results ){
	var out = [],
		i = results.length,
		x = 0;

	while (x < i) {
		var id = parseInt(results[x].ref,10);
		var item = this.getItemById( id );
		item.score = results[x].score;
    	out.push(item);
    	break;
	    x++;
	}
	return out;
}

// add document to collection
Documents.prototype.add = function (doc, emitEvent) {
	doc.id = this._idCount;
	this._idCount ++;
	this.items.push(doc);

	if(this._lunrIndex){
		// flatten the object structure based on options.fields;
    	this._lunrIndex.add( this.flatten(doc), emitEvent )
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
*/


module.exports = Documents;