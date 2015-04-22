# Mani

# IN DEVELOPMENT - NOT STABLE

###  Pure javascript search - browser and node.js
Mani provides a document based search tool in javascript. It can be used in a browser or with node.js/io.js Its a very simplistic version of the type of features you get from [Solr](http://lucene.apache.org/solr/).



### Features

* Free text search
	* field boast
	* injects match score
* ~~Query~~
	* ~~Simple query based on Mongodb syntax~~
* GEO search
	* Nearby query/sort
	* injects distance	
* Facets
* Pageing
* ~~Persistent Storage~~
* Works with complex JSON documents with child objects
   * Define property selections with JSON path

### Install
    npm install mani


### Text search
A code example of setting up a search index, loading 2 documents and search for the text 'promises'.
```javascript

	var options = {
	   'text': [
	      {'path': 'title', 'boost': 20},
	      {'path': 'article.body'}
	   ]
	}

	var index = new Mani(options);

    index.add({
      title: 'Are promises better than callback',
      article: {
         body: 'Do promises offer more flexibility than callbacks...',
         tags: ['javascript','es6','promises']
      }
   });
    index.add({
      title: 'ES6 and preprocessors',
      article: {
         body: 'Compile ES6 script on the fly using...',
         tags: ['javascript','es6','traceur','babel']
      }
    });
    
     var results = index.search({
        text: 'promises'
     });
```

### Geo
A code example of querying and sorting documents using a geolocation.

#### Nearby
Adding latitude and longitude paths to the index schema:
```javascript
	var options = {
	   'text': [
	      {'path': 'title', 'boost': 20},
	      {'path': 'article.body'}
	   ],
	   'geo': {
	        'point': {
	            'latitudePath': 'location.latitude', 
                'longitudePath': 'location.longitude',
	        }
	   }
	}
```
Constructing the search:
```javascript
    var results = index.search({
         'text': 'promises', 
         'nearby': {
            'latitude': 52.516272, 
            'longitude': 13.377722,
            'offset': 0
         }
      })
```
### Facets
A code example of returning facets from a document set.
From the documents in a search result:
```
    var results = index.search({
         text: 'promises', 
         facets: {
            'path': 'article.tags'
         }
      })
```
From all documents in a index:
```
    var results = index.facets({
        'path': 'article.tags'
      })
```

### Paging
A code example of returning results in pages set using `limit` and `startAt`

```javascript
var results = index.search({
         text: 'promises', 
         facets: {
            'path': 'article.tags'
         }
        'limit': 20,
	   	'startAt': 20
      })
```

Properties used for paging:
* `limit` limits the number of results returned has to 1 or greater.
* `startAt` defines where mani starts returning results from within a result set.



### Built on top of
This project stand on the shoulders of others:
* [lunrjs](http://lunrjs.com/) - free text search   
* [geolib](https://github.com/manuelbieh/Geolib) - nearby search    

### The name "Mani"
In viking mythology **Mani** is the man who drives the chariot that carries the Moon across the sky. I thought this would be a good name for a wrapper of [lunrjs](http://lunrjs.com/).
 

### Tests
The project has a number integration and unit tests. To run the test within the project type the following command.

    $ mocka --reporter list


### Support or Contact
Having trouble, please raise an issue at: [https://github.com/glennjones/mani/issues](https://github.com/glennjones/mani/issues)


### License
The project is open sourced under MIT license. See the [license.txt](https://raw.github.com/glennjones/mani/master/license.txt "license.txt") file within the project source.