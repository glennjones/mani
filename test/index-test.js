/*
Mocha  test from: fts
*/

var   chai    = require('chai'),
      assert   = chai.assert,
      mani   = require('../mani.js'),
      data     = require('../data/places.json');


var options1 = {
   'text': [
      {'path': 'properties.name', 'boost': 20},
      {'path': 'properties.street-address'},
      {'path': 'properties.locality', 'boost': 10},
      {'path': 'properties.region'},
      {'path': 'properties.postal-code'},
      {'path': 'properties.country-name', 'boost': 5},
      {'path': 'properties.category', 'boost': 20}
   ]
}



describe('index constructor with fts', function() {

   var index = mani(options1);

   it("index created", function(){
      assert.isNotNull(index, "mani index NOT created");
      assert.isNotNull(index._lunrIndex, "lunr fts index NOT in internal property");
      assert.isNotNull(index._getLunrIndex(options1), "lunr fts index NOT created by internal method");
   })

})


describe('index constructor without fts', function() {

   var index1 = mani({});

   it("empty options - no fts index created", function(){
      assert.isNull(index1._lunrIndex, "_lunrIndex should be null");
      assert.isNull(index1._getLunrIndex({}), "getLunrIndex method should return null with empty options object");
   })


   var index2 = mani();

   it("no options - no fts index created", function(){
      assert.isNull(index2._lunrIndex, "_lunrIndex should be null");
      assert.isNull(index2._getLunrIndex(), "getLunrIndex method should return null with empty options object");
   })

})


/*
describe('add items to index', function() {

   var index = mani(options1);

   it("add item", function(){
      assert.isNull(index._lunrIndex, "lunr fts should be null");
      assert.isNull(index._getLunrIndex(options), "getLunrIndex method should return null with empty options object");
   })

   it("add aary of items", function(){
      assert.isNull(index._lunrIndex, "lunr fts should be null");
      assert.isNull(index._getLunrIndex(options), "getLunrIndex method should return null with empty options object");
   })

})



describe('search', function() {

   var index = mani(options1);

   it("free text search", function(){
      assert.isNull(index._lunrIndex, "lunr fts should be null");
      assert.isNull(index._getLunrIndex(options), "getLunrIndex method should return null with empty options object");
   })


   it("return criteria", function(){
      assert.isNull(index._lunrIndex, "lunr fts should be null");
      assert.isNull(index._getLunrIndex(options), "getLunrIndex method should return null with empty options object");
   })



   it("return criteria", function(){
      assert.isNull(index._lunrIndex, "lunr fts should be null");
      assert.isNull(index._getLunrIndex(options), "getLunrIndex method should return null with empty options object");
   })

})


describe('search facets', function() {

   var index = mani(options1);

   it("returns facets", function(){
      assert.isNull(index._lunrIndex, "lunr fts should be null");
      assert.isNull(index._getLunrIndex(options), "getLunrIndex method should return null with empty options object");
   })


   it("limits facets", function(){
      assert.isNull(index._lunrIndex, "lunr fts should be null");
      assert.isNull(index._getLunrIndex(options), "getLunrIndex method should return null with empty options object");
   })


})*/