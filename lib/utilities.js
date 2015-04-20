


exports.reach = function (obj, chain, options) {

    options = options || {};
    if (typeof options === 'string') {
        options = { separator: options };
    }

    var path = chain.split(options.separator || '.');
    var ref = obj;
    for (var i = 0, il = path.length; i < il; ++i) {
        var key = path[i];
        if (key[0] === '-' && Array.isArray(ref)) {
            key = key.slice(1, key.length);
            key = ref.length - key;
        }

        if (!ref ||
            !ref.hasOwnProperty(key) ||
            (typeof ref !== 'object' && options.functions === false)) {         // Only object and function can have properties

           	/* 
           	exports.assert(!options.strict || i + 1 === il, 'Missing segment', key, 'in reach path ', chain);
            exports.assert(typeof ref === 'object' || options.functions === true || typeof ref !== 'function', 'Invalid segment', key, 'in reach path ', chain);
        	*/    
        	ref = options.default;
            break;
        }

        ref = ref[key];
    }

    return ref;
};