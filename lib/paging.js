var _			= require('lodash'),
	utilities	= require('./utilities');




function page(options, documents){
	this.options = (options)? options : {};

	var out = {
			'documents': documents
		}

	if(this.options.paging && Array.isArray(documents)){
		out.info = {itemCount: _size(documents)};

		if(this.options.paging.startAt){
			var startAtNum = this.options.paging.startAt;
			if(startAtNum < out.info.itemCount){
				out.info.startAt = startAtNum
				documents = _startAt(startAtNum, documents)
			}
		}

		if(this.options.paging.limit){
			var limitNum = this.options.paging.limit;
			if(limitNum < documents.length){
				out.info.limit = limitNum
				documents = _limit(limitNum, documents)
			}

		}

		// add pageNumber

		out.documents = documents;
	}

	return out

}


function _startAt(num, documents){
	if(_.isNumber(num) && num > 1 && Array.isArray(documents)){
		num = parseInt(num, 10);
		return documents.slice(num-1);
	}else{
		return [];
	}
}


function _limit(num, documents){
	if(_.isNumber(num) && Array.isArray(documents)){
		num = parseInt(num, 10);
		return documents.slice(0, num);
	}else{
		return [];
	}
}


function _size(documents){
	if(Array.isArray(documents)){
		return documents.length;
	}else{
		return 0;
	}
}


exports.page = page;
exports._startAt = _startAt;
exports._limit = _limit;
exports._size = _size;



/*
http://docs.mongodb.org/manual/reference/method/cursor.skip/
http://docs.mongodb.org/manual/reference/method/cursor.limit/
http://docs.mongodb.org/manual/reference/method/cursor.size/
*/
