var _			= require('lodash'),
	utilities	= require('./utilities');


// create a documents collection that encapsules lunr interface
Match = function( options, eventEmitter ){
	this.options = (options)? options : {};
	
	this.eventEmitter = (eventEmitter)? this.eventEmitter : null;
};


Match.prototype.search = function (options, documents, subSet) {
	var self = this,
		items = [];

	if(Array.isArray(subSet)){
		items = documents.getItemsFromResults(subSet);
	}else{
		items = documents.items;
	}	

	if(options.query){
		items = items.filter(function(item){
			return self._isValidMatch(item, options.query); 
		})
	}

	return items.map(function(item){
		return {'ref':item.id}; 
	})
}


Match.prototype._isValidMatch = function (item, query) {
	var isValid = true;

	//console.log(JSON.stringify(query) );

	// loop query items
	for (var queryItem in query) {
	  if( query.hasOwnProperty( queryItem ) ) {

	    //console.log(queryItem + " = " + JSON.stringify(query[queryItem]) );
	    var prop = utilities.reach(item, queryItem)

	    // if its a string/number/bool etc plain match
	    if(_.isObject(query[queryItem]) === false){

			// found property for match
		    if(prop !== undefined){
		    	// turn into single value
		    	if(Array.isArray(prop)){
		    		prop = prop[0]
		    	}
		   

		    	// if its not a match filter out item
		    	if(prop !== query[queryItem]){
					isValid = false;
		    	}
		    }

	    }



	  } 
	}

	return isValid;
}





module.exports = Match

