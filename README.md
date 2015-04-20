# Mani

# IN DEVELOPMENT - NOT STABLE

###  Pure javascript search - browser and node.js
Mani provides a modern document based search tool in pure Javascript. It can be used in a browser or with node.js/io.js Its a very simplistic version of the type of features you get from Solr or Elastic Search.  

* Free text search
	* field boast
	* match scores
* ~~Query~~
	* ~~Simple query based on Mongodb syntax~~
* ~~GEO search~~
	* ~~Nearby sort~~	
* Facets
* ~~Pageing~~
* ~~Persistent Storage~~
* Works with complex JSON documents with child objects
   * Define properties selections with JSON path

### Install
    npm install mani
    
### Built on top of
This project stand on the shoulders of others:
* [http://lunrjs.com/](lunrjs) - free text search    

### The name "Mani"
In viking mythology **Mani** is the man who drives the chariot that carries the Moon across the sky. I thought this would be a good name for a wrapper of [http://lunrjs.com/](lunrjs).
 
    

### Tests
The project has a number integration and unit tests. To run the test within the project type the following command.

    $ mocka --reporter list


### Support or Contact
Having trouble, please raise an issue at: [https://github.com/glennjones/mani/issues](https://github.com/glennjones/mani/issues)


### License
The project is open sourced under MIT license. See the [license.txt](https://raw.github.com/glennjones/mani/master/license.txt "license.txt") file within the project source.