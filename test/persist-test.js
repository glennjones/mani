/*
Mocha test for: match
*/

var   Chai     		= require('chai'),
      assert   		= Chai.assert,
      Persist   	   = require('../lib/persist.js'),
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



describe('persist', function() {

   var persist = new Persist({});

   it("created", function(){
      assert.deepEqual(match.options, {}, "should emply options object");
   })

})


