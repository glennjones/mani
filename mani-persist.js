(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Persist = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


// TODO write client-side tests for persist module

/*var localforage			= require('localforage');



// create a documents collection that encapsules lunr interface
Persist = function( index, options, callback ){

	var self = this;
	this.options = (options)? options : {};

	if(!this.options.name ){
		this.options.name = 'mani';
	}
	if(!this.options.auto ){
		this.options.auto = false;
	}

	this.index = index;
	localforage.config({
    	'name': self.options.name + '-collection'
	});

	// capture all event and if auto true save changes
	this.index.on('add', 'remove', 'update', (function () {
		if(self.options.auto === true){
			//self.save(function(){})
		}
	}));


	// if auto is true at start load current items into index
	if(this.options.auto === true){
		this.load(function(err, items){
			if(callback){
				callback(err, items)
			}
		});
	}else{
		if(callback){
			callback(err, []);
		}
	}

};


Persist.prototype.save = function (callback) {
	var name = (this.options.name)? this.options.name + '-documents' : 'documents';

	localforage.setItem(name, this.index.documents.items).then(function(value) {
	    console.log('document collection was stored: ' + value.length);
	    callback(null, value); 
	}, function(err) {
	    console.error('document collection store errored: ' +  error);
	    callback(err, null) 
	});

}


Persist.prototype.load = function (callback) {
	var name = (this.options.name)? this.options.name + '-documents' : 'documents';

	localforage.getItem(name).then(function(value) {
	    console.log('document collection was restored: ' + value.length);
	    index.add(value);
	    callback(null, value) 
	}, function(err) {
	    console.error('document collection restored errored: ' +  error);
	    callback(err, null) 
	});

}


Persist.prototype.removeAll = function (callback) {
	var name = (this.options.name)? this.options.name + '-documents' : 'documents';

	localforage.removeItem(name).then(function(value) {
	    console.log('document collection was removed: ' + value.length)
	    callback(null, value) 
	}, function(err) {
	    console.error('document collection remove errored: ' +  error);
	    callback(err, null) 
	});

}







module.exports = Persist
*/
},{}]},{},[1])(1)
});