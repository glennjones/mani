/*
Mocha test for: paging
*/

var   Chai     		= require('chai'),
      assert   		= Chai.assert,
      Paging   		= require('../lib/paging.js'),
      Mani     		= require('../lib/index.js');



var options = {
	'text': [
      {'path': 'title'}
   	]
}

// example data     
var docs = [
	{id: 0, title: 'test 1'},
	{id: 1, title: 'test 2'},
	{id: 2, title: 'test 3'},
	{id: 3, title: 'test 4'},
	{id: 4, title: 'test 5'},
	{id: 5, title: 'test 6'},
	{id: 6, title: 'test 7'},
	{id: 7, title: 'test 8'},
	{id: 8, title: 'test 9'},
	{id: 9, title: 'test 10'},
	{id: 10, title: 'test 11'},
	{id: 11, title: 'test 12'},
	{id: 12, title: 'test 13'},
	{id: 13, title: 'test 14'},
	{id: 14, title: 'test 15'},
	{id: 15, title: 'test 16'},
	{id: 16, title: 'test 17'},
	{id: 17, title: 'test 18'},
	{id: 18, title: 'test 19'},
	{id: 19, title: 'test 20'},
   ];



describe('paging', function() {

 	it("size", function(){
 		assert.equal(Paging._size(null), 0, "should return size of documents array");
 		assert.equal(Paging._size(docs), 20, "should return 0 size if passed object is not an array");
 	})

})


describe('paging', function() {

 	it("limit", function(){
 		assert.equal(Paging._limit(null, docs).length, 0, "should return no documents if num is incorrect format");
 		assert.equal(Paging._limit(5, docs).length, 5, "should return 5 documents");
 	})

})


describe('paging', function() {

 	it("startAt", function(){
 		assert.equal(Paging._startAt(null, docs).length, 0, "should return no documents if num is incorrect format");
 		assert.equal(Paging._startAt(5, docs)[0].title, "test 5", "should return 5 documents");
 	})

})

describe('paging', function() {

 	it("page - empty options", function(){
 		assert.equal(Paging.page({}, docs).documents.length, 20, "should return all 20 documents");
 	})

})


describe('paging', function() {

	var options = {
		'paging': {
			'startAt': 6,
			'limit': 5
		}
	}

	//console.log(JSON.stringify(Paging.page(options, docs)));

 	it("page - documents", function(){
 		assert.equal(Paging.page(options, docs).documents.length, 5, "should return 5 documents");
 		assert.equal(Paging.page(options, docs).documents[0].title, "test 6", "should first returned document should be 5");
 		assert.equal(Paging.page(options, docs).documents[4].title, "test 10", "should lasted returned document should be 10");
 	})

})


describe('paging', function() {

	var options = {
		'paging': {
			'startAt': 6,
			'limit': 5
		}
	}

	//console.log(JSON.stringify(Paging.page(options, docs)));

 	it("page - info", function(){
 		assert.deepEqual(Paging.page(options, docs).info, {
	 			"itemCount": 20,
	        	"startAt": 6,
	        	"limit": 5,
	        	"pageCount": 4,
			   	"page": 2
	        }, "should return paging information");

 	})

})


describe('paging', function() {

	var indexOptions = {
		'text': [{'path': 'title'}]
	}

	var index = Mani(indexOptions);
    index.add(docs);
	returnedItem = index.search({
		'text': 'test',
		'paging': {
			'startAt': 6,
			'limit': 5,
		}
	})

	//console.log(JSON.stringify(returnedItem));

 	it("page - full index", function(){
 		assert.equal(returnedItem.items.length, 5, "should return 5 documents");
 		assert.equal(returnedItem.items[0].title, "test 6", "should first returned document should be 5");
 		assert.equal(returnedItem.items[4].title, "test 10", "should lasted returned document should be 10");
 	})

})



/*
function page(options, documents){
function startAt(num, documents){
function limit(num, documents){
function size(documents){*/
