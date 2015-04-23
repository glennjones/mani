/*
Mocha test for: match
*/

var   Chai     		= require('chai'),
      assert   		= Chai.assert,
      Match   	      = require('../lib/match.js'),
      Documents      = require('../lib/documents.js'),
      Mani     		= require('../lib/index.js');


// test options for index constructor
var options = {
   'text': [
      {'path': 'title', 'boost': 20},
      {'path': 'article.body'}
   ]
}

// example data     
var docs = [{
      'title': 'test 1',
      'article': {
         'body': 'using foo',
         'tags': ['foo','bar']
      },
      'published':  false,
      'viewed': 1284
   },{
      'title': 'test 2',
      'article': {
         'body': 'using bar',
         'tags': ['extra','foo']
      },
      'published':  true,
      'viewed': 3552
   }];



describe('match', function() {

   var match = new Match({});

   it("created", function(){
      assert.deepEqual(match.options, {}, "should emply options object");
   })

})


describe('match', function() {

   var match = new Match({});

   var query1 = {
         'title':'test 1'
   };

   var query2 = {
         'published':false
   };

   var query3 = {
         'viewed':1284
   };

   it("_isValidMatch - single string match", function(){
      assert.deepEqual(match._isValidMatch(docs[0], query1), true, "should match title property");
      assert.deepEqual(match._isValidMatch(docs[1], query1), false, "should not match title property");
   })

   it("_isValidMatch - single bool match", function(){
      assert.deepEqual(match._isValidMatch(docs[0], query2), true, "should match title property");
      assert.deepEqual(match._isValidMatch(docs[1], query2), false, "should not match title property");
   })

   it("_isValidMatch - single number match", function(){
      assert.deepEqual(match._isValidMatch(docs[0], query3), true, "should match title property");
      assert.deepEqual(match._isValidMatch(docs[1], query3), false, "should not match title property");
   })

})


describe('match', function() {

   var match = new Match({});

   var query1 = {
         'title':'test 1',
         'published':  false
   };

   it("_isValidMatch - more than one match", function(){
      assert.deepEqual(match._isValidMatch(docs[0], query1), true, "should match title/published properties");
      assert.deepEqual(match._isValidMatch(docs[1], query1), false, "should not match title/published properties");
   })

})


describe('match', function() {

   var match = new Match({});

   var query1 = {
         'article.body':'using foo'
   };

   it("_isValidMatch - using JSON path", function(){
      assert.deepEqual(match._isValidMatch(docs[0], query1), true, "should match article.body property");
      assert.deepEqual(match._isValidMatch(docs[1], query1), false, "should not match article.body property");
   })

})

/* TO DO: Add indexOf handling fro arrays
describe('match', function() {

   var match = new Match({});

   var query1 = {
         'article.tags':'bar'
   };

   it("_isValidMatch - using JSON path", function(){
      assert.deepEqual(match._isValidMatch(docs[0], query1), true, "should match article.tags property");
      assert.deepEqual(match._isValidMatch(docs[1], query1), false, "should not match article.tags property");
   })

})
*/

