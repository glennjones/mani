
var Lunr		= require('lunr'),
	GeoLib		= require('geolib'),
	Utilities	= require('./utilities'),
	Documents	= require('./documents'),
	FreeText	= require('./freetext'),
	Geo			= require('./geo'),
	Facets		= require('./facets'),
	Paging		= require('./paging');


console.log(Lunr.version)

function Mani(options) {
    this.version = '0.0.2';
 	return new Mani.Index(options);
}



Mani.Index = function (options) {
	this.options = (options)? options : {};

	this.documents = new Documents(this.options);
    this._freetext = new FreeText(this.options);
    this._geo = new Geo(this.options);
    //this._facets = new Facets(options);

}


// expose externally 
Mani.geo = Geo;
Mani.lunr = Lunr;



Mani.Index.prototype.search = function (options) {
	options = (options)? options : {};
	var out = {
		'criteria' : options,
		'items': []
	},
	resultSet = null;

	// excute free text search
	if(options.text){
		resultSet  = this._freetext.search( options, resultSet );
	}

	// excute geo nearby search
	if(options.nearby){
		resultSet  = this._geo.nearby( options, resultSet );
	}

	// excute paging
	if(options.paging){
		var pagingResults = Paging.page( options, resultSet );
		resultSet = pagingResults.documents;
		if(pagingResults.info){
			out.paging = pagingResults.info
		}
	}


	out.items = this.documents.getItemsFromResults( resultSet );

	// excute facet build based on results
	if(options.facets){
		var facets = new Facets();
    	out.facets = facets.build(this.documents, options.facets, resultSet)
	}

	return out; 
}


Mani.Index.prototype.facets = function (options) {
	if(options){
		var facets = new Facets();
    	return facets.build(this.documents, options)
	}else{
		return null;
	}
}


Mani.Index.prototype.add = function (doc) {
	if(Array.isArray(doc)){
		var self = this;
		doc.forEach(function(item) {
			self.documents.add(item);
			self._freetext.add(item);
	    	self._geo.add(item);
		})
		return doc;
	}else{
		this.documents.add(doc);
		this._freetext.add(doc);
    	this._geo.add(doc);
		return doc;
	}
}



/*Mani.Index.prototype.remove = function (doc) {
    return this._lunrIndex.remove( doc )
}


Mani.Index.prototype.update = function (doc ) {
    return this._lunrIndex.update( doc )
}


Mani.Index.prototype.toJSON = function () {
    return this._lunrIndex.toJSON();
}
*/



module.exports = Mani;




  



 
