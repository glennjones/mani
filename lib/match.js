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


Match.prototype._isValidMatch = function (item, query, path) {
	var self = this,
		isValid = true;


	// loop query items
	for (var queryItem in query) {
	  	if( query.hasOwnProperty( queryItem ) ) {

		    // reach into JSON structure to get item
		    var queryObj = query[queryItem],
		    	prop = utilities.reach(item, queryItem);

		    
    		// turn into single value into an array
	    	if(!Array.isArray(prop)){
	    		prop = [prop]
	    	}

	    	// check for user specified recasting of data type
	    	prop = this._typeTo( prop, (path)? path : queryItem ); 


	    	
	    	if(_.isObject(queryObj) === false){

				// simple equals match ie the vaule is not a object
				if(path !== undefined){
					path += queryItem
				}
				isValid = self._isValidEqualsMatch( prop, queryObj );

		    }else{

		    	// loop object properties to find sub queries 
				for (var subQueryKey in queryObj) {

				  if( queryObj.hasOwnProperty( subQueryKey ) ) {

				  	// rebuild sub query object for matching
				    var singleQuery = {};
				    singleQuery[subQueryKey] = queryObj[subQueryKey]


					if( self._isOperator ( subQueryKey ) ){

						// operator match ie < > !==
				    	if(self._isValidOperatorMatch( prop, singleQuery ) === false){
				    		isValid = false;
				    	}	

				    }else{

				    	// sub document match
			    		var compPath = (path)? path : queryItem + '.';
			    		if(self._isValidInSubDocuments( prop, singleQuery, compPath ) === false){
			    			isValid = false;
				    	}	

			    	}

				  } 
				}


			/*		if( self._isOperator ( queryObj ) ){

						// operator match ie < > !==
				    	isValid = self._isValidOperatorMatch( prop, queryObj )	

				    }else{

				    	// sub document match
			    		var compPath = (path)? path : queryItem + '.';
			    		isValid = self._isValidInSubDocuments( prop, queryObj, compPath );

			    	}*/


	
			}

	  	} 
	}

	/*if(path !== undefined){
		console.log(path)
	}*/

	return isValid;
}


// given a grounp of sub documents match query against each 
Match.prototype._isValidInSubDocuments = function ( subDocuments, query, path ){
	var self = this,
		isValid = false;

	// define path for subDocuments
	if(_.isObject(query)){
		var keys = Object.keys(query);
		if(keys[0] && _.startsWith( keys[0], '$') === false){
			path += keys[0];
		}	
	}

	if( Array.isArray(subDocuments)){
		subDocuments.forEach(function(item){

			// find one match make parent valid
			if( self._isValidMatch(item, query, path) ){
				isValid = true;
			}
		});
	}

	return isValid;
}



// simple equals match
Match.prototype._isValidEqualsMatch = function ( propValue, test ){
	var isValid = true;
	if(propValue !== undefined){
    	if( propValue.indexOf(test) === -1){
    		isValid = false;
    	}
	}
	return isValid;
}



// an operator match
Match.prototype._isValidOperatorMatch = function ( propValue, obj ){

	var isValid = false;

	if(propValue !== undefined && obj !== undefined){
		var test = null,
			prop = null,
			key = Object.keys(obj);

		if(key.length > 0){
			key = key[0]
			test = this._convertType( obj[key] );
			prop = this._convertType( propValue[0] );
			

			switch (key) {
				case '$gt':
					// Greater than
					isValid = (prop > test );
					break;

				case '$gte':
					// Greater than or equal
					isValid = (prop >= test);
					break;

				case '$lt':
					// Less than
					isValid = (prop < test);
					break;

				case '$lte':
					// Less than or equal
					isValid = (prop <= test);
					break;

				case '$exists':
					// Property exists
					isValid = (prop === undefined) !== test;
					break;

				case '$ne': // Not equals
					isValid =  (prop != test); // jshint ignore:line
					break;

				default:
					isValid = false;
				
			}

		}
	}	

	return isValid;

}



// does the frist key in an object startwith $
Match.prototype._isOperator = function ( obj ){
	return _.startsWith( obj, '$');
}



// converts to more basic object type for comparison
Match.prototype._convertType = function ( obj ){
	if(_.isDate(obj)){
		obj = obj.getTime();
	}
	return obj
}



// support path with sub documents ie comments.|.tags




// converts to user specified type by casting
Match.prototype._typeTo = function ( arr, path ){
	var self = this;


	// if there are any instruction to cast properties
	if(this.options.typeTo){
		this.options.typeTo.forEach(function(item){

			// if user has add this property path 
			if(item.path !== undefined && 
				item.convertTo !== undefined 
				&& item.path === path){

				// return a new array cast to correct data type
				arr = arr.map(function(obj){

					switch (item.convertTo) {
						case 'date':
							obj = new Date(obj);
							if(self._isValidDate(obj) === false){
								obj = null;
							}
							break;

						case 'float':
							obj = parseFloat(obj);
							if(isNaN(obj)){
								obj = null;
							}
							break;

						case 'int':
							obj = parseInt(obj, 10);
							if(isNaN(obj)){
								obj = null;
							}
							break;

						case 'string':
							if(obj && obj.toString){
								obj = obj.toString()
							}else{
								obj = null;
							}
							break;
					}

					// return cast object
					return obj;

				});	
			}	
		});
	}
	return arr
}


// checks both object type and validness of date structure
Match.prototype._isValidDate  = function (d) {
  	if ( Object.prototype.toString.call(d) !== "[object Date]" ){
  		return false;
  	}else{
  		return !isNaN(d.getTime());
  	}
}




module.exports = Match

