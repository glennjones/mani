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
	var self = this,
		isValid = true;

	//console.log(JSON.stringify(query) );

	// loop query items
	for (var queryItem in query) {
	  	if( query.hasOwnProperty( queryItem ) ) {

		    //console.log(queryItem + " = " + JSON.stringify(query[queryItem]) );
		    var prop = utilities.reach(item, queryItem)


    		// turn into single value into an array
	    	if(!Array.isArray(prop)){
	    		prop = [prop]
	    	}

	    	// if its a string/number/bool etc plain match
	    	if(_.isObject(query[queryItem]) === false){

				// found property for match
	    		if(prop !== undefined){
			    	if( prop.indexOf(query[queryItem]) === -1){
			    		isValid = false;
			    	}
				}

		    }else{
		    	isValid = self._isValidObjMatch( prop, query[queryItem] )
		    }

	  	} 
	}

	return isValid;
}

Match.prototype._isValidObjMatch = function ( propValue, obj ){

	var isValid = false,
		test = null,
		key = Object.keys(obj);

	if(key.length > 0){
		key = key[0]
		test = obj[key];
		propValue = propValue[0];
		

		switch (key) {
			case '$gt':
				// Greater than
				isValid = (test > propValue);
				break;

			case '$gte':
				// Greater than or equal
				isValid = (test >= propValue);
				break;

			case '$lt':
				// Less than
				isValid = (test < propValue);
				break;

			case '$lte':
				// Less than or equal
				isValid = (test <= propValue);
				break;

			case '$exists':
				// Property exists
				isValid = (propValue=== undefined) !== test;
				break;

			case '$ne': // Not equals
				isValid =  (propValue != test); // jshint ignore:line
				break;

			default:
				isValid = false;
			
		}

	}	

	return isValid;

}





module.exports = Match

