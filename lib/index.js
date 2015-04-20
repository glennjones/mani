
var Lunr		= require('lunr'),
	GeoLib		= require('geolib'),
	utilities	= require('./utilities'),
	documents	= require('./documents'),
	query		= require('./query'),
	geo			= require('./geo'),
	facets		= require('./facets'),
	paging		= require('./paging');


console.log(Lunr.version)

function Mani(options) {
    this.version = '0.0.1';
 	return new Mani.Index(options);
}

Mani.version = '0.0.2';


Mani.Index = function (options) {
    this._lunr = Lunr;
    this._lunrIndex = null;

    // needs text options
    if(options && options.text){
	    this._lunrIndex = this._getLunrIndex(options);    	
	    this.documents = new Documents({
			'lunrIndex': this._lunrIndex,
			'textProperties': options.text
		});
	}

    this.facets = function(options){
    	var facets = new Facets();
    	return facets.build(this.documents, options)
    } 

}


Mani.Index.prototype._getLunrIndex = function (options) {
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


/*(function () {
			this.field('name', {boost: 20})
			this.field('street-address')
			this.field('locality', {boost: 10})
			this.field('region')
			this.field('postal-code')
			this.field('country-name', {boost: 5})
			this.field('category', {boost: 20})
			this.ref('id')
		})*/


Mani.Index.prototype.search = function (options) {
	var out = {
		'criteria' : options,
		'items': []
	},
		ftsResults = null;

	// excute free text search
	if(options && options.text){
		ftsResults = this._lunrIndex.search( options.text );
		out.items = this.documents.getItemsFromResults( ftsResults );
	}

	// excute facet build based on results
	if(options && options.facets){
		var facets = new Facets();
    	out.facets = facets.build(this.documents, options.facets, ftsResults)
	}

	return out; 
}


Mani.Index.prototype.add = function (doc, emitEvent) {
	if(Array.isArray(doc)){
		doc.forEach(function(item) {
			this.documents.add(doc);
		})
	}else{
		this.documents.add(doc, emitEvent);
	}
}


/*Mani.Index.prototype.remove = function (doc, emitEvent) {
    return this._lunrIndex.remove( doc, emitEvent )
}


Mani.Index.prototype.update = function (doc, emitEvent) {
    return this._lunrIndex.update( doc, emitEvent )
}


Mani.Index.prototype.toJSON = function () {
    return this._lunrIndex.toJSON();
}
*/



module.exports = Mani;




  



 
