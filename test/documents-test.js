/*
Mocha test for: documents
*/

var   chai     		= require('chai'),
      assert   		= chai.assert,
      documents   	= require('../lib/documents.js'),
      mani     		= require('../lib/index.js');


// test options for index constructor
var options = {
   'text': [
      {'path': 'title', 'boost': 20},
      {'path': 'article.body'}
   ]
}

// example data     
var docs = [{
      title: 'test 1',
      article: {
         body: 'using foo',
         tags: ['foo','bar']
      }
   },{
      title: 'test 2',
      article: {
         body: 'using bar',
         tags: ['extra','foo']
      }
   }];


// moch of search results
var searchResults =  [{"ref":"1","score":0.30815769789216485}];   




describe('document', function() {


	var index = new mani(options),
	documentOptions = {
		'lunrIndex': index._lunrIndex,
		'textProperties': options.text
	};

	var documentsObj = new documents(documentOptions);

   	it("collection created", function(){
   		assert(Array.isArray(documentsObj.items), "should have an items array");
		assert.deepEqual(documentsObj._textProperties, options.text, "should have textProperties assigned");
		assert.isNotNull(documentsObj._lunrIndex, "should have created a lunr index");
   	})

})

describe('document', function() {

	var index = new mani(options);
   	index.add(docs);

	var flat = index.documents.flatten(index.documents.items[0]);
	//console.log(flat)

   	it("flatten", function(){
		assert.deepEqual(flat, { p0: 'test 1', p1: 'using foo', id: 0 }, "should return flat object for lunr");
   	})

})


describe('document', function() {

	var index = new mani(options);
   	index.add(docs);

    var item = index.documents.getItemById(1);
    //console.log(item)

   	it("getItemById", function(){
		assert.deepEqual(item, { 
			id: 1,
  			title: 'test 2',
  			article: { 
  				body: 'using bar', 
  				tags: [ 'extra', 'foo' ] 
  			} 
  		}, "should return 2nd document");
   	})

})


describe('document', function() {

	var index = new mani(options);
   	index.add(docs);

   	var items = index.documents.getItemsFromResults(searchResults);
   	delete items[0].score;
   	//console.log(items)

   	it("getItemsFromResults", function(){
		assert.deepEqual(items, [{ 
			id: 1,
    		title: 'test 2',
    		article: { 
    			body: 'using bar', 
    			tags: [ 'extra', 'foo' ]  
    		} 
    	}], "should return 2nd document in an array");
   	})

})


describe('document', function() {

	var index = new mani(options),
   		item = index.documents.add(docs[0]);


   	it("add", function(){
		assert.deepEqual(item, { 
	      id: 0, 
	      title: 'test 1',
	      article: {
	         body: 'using foo',
	         tags: ['foo','bar']
	      }
  		}, "should return the added document");
   	})

})