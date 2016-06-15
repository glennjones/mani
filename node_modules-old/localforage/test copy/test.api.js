/* global beforeEach:true, describe:true, expect:true, it:true, Promise:true */
describe('localForage API', function() {
    'use strict';

    beforeEach(function(done) {
        localforage.clear(done);
    });

    // If this test is failing, you are likely missing the Promises polyfill,
    // installed via bower. Read more here:
    // https://github.com/mozilla/localForage#working-on-localforage
    it('has Promises available', function(done) {
        expect(Promise).toBeDefined();
        done();
    });

    it('has a localStorage API', function(done) {
        expect(typeof localforage.getItem).toEqual('function');
        expect(typeof localforage.setItem).toEqual('function');
        expect(typeof localforage.clear).toEqual('function');
        expect(typeof localforage.length).toEqual('function');
        expect(typeof localforage.removeItem).toEqual('function');
        expect(typeof localforage.key).toEqual('function');
        done();
    });

    it('has the localForage API across drivers', function(done) {
        expect(typeof localforage._initStorage).toEqual('function');
        expect(typeof localforage.driver).toEqual('function');
        expect(typeof localforage.getItem).toEqual('function');
        expect(typeof localforage.setItem).toEqual('function');
        expect(typeof localforage.clear).toEqual('function');
        expect(typeof localforage.length).toEqual('function');
        expect(typeof localforage.removeItem).toEqual('function');
        expect(typeof localforage.key).toEqual('function');
        done();
    });

    it('has an empty length by default', function(done) {
        localforage.length(function(length) {
            expect(length).toEqual(0);
            done();
        });
    });

    it('returns null for non-existant key with getItem() [callback]', function(done) {
        localforage.getItem('key', function(value) {
            expect(value).toEqual(null);
            done();
        });
    });

    it('returns null for non-existant key with getItem() [promise]', function(done) {
        localforage.getItem('key').then(function(value) {
            expect(value).toEqual(null);
            done();
        });
    });

    it('saves an item with setItem() [callback]', function(done) {
        localforage.setItem('officeName', 'Initech', function(setValue) {
            expect(setValue).toEqual('Initech');

            localforage.getItem('officeName', function(value) {
                expect(value).toEqual(setValue);
                done();
            });
        });
    });

    it('saves an item with setItem() [promise]', function(done) {
        localforage.setItem('officeName', 'Initech').then(function(setValue) {
            expect(setValue).toEqual('Initech');

            localforage.getItem('officeName').then(function(value) {
                expect(value).toEqual(setValue);
                done();
            });
        });
    });

    it('returns null when saving undefined [callback]', function(done) {
        localforage.setItem('undef', undefined, function(setValue) {
            expect(setValue).toEqual(null);

            done();
        });
    });

    it('returns null when saving undefined [promise]', function(done) {
        localforage.setItem('undef', undefined).then(function(setValue) {
            expect(setValue).toEqual(null);

            done();
        });
    });

    it('returns null for a non-existant key [callback]', function(done) {
        localforage.getItem('undef', function(value) {
            expect(value).toEqual(null);

            done();
        });
    });

    it('returns null for a non-existant key [promise]', function(done) {
        localforage.getItem('undef').then(function(value) {
            expect(value).toEqual(null);

            done();
        });
    });

    /*
    https://github.com/mozilla/localforage/pull/24#discussion-diff-9389662R158
    localStorage's method API (`localStorage.getItem('foo')`) returns "null"
    for undefined keys, even though its getter/setter API (`localStorage.foo`)
    returns `undefined` for the same key. Gaia's asyncStorage API, which is
    based on localStorage and upon which localforage is based, ALSO returns
    `null`. BLARG! So for now, we just return null, because there's no way to
    know from localStorage if the key is ACTUALLY `null` or undefined but
    returning `null`. And returning `undefined` here would break compatibility
    with localStorage fallback. Maybe in the future we won't care...
    */
    it('returns null with empty db using key() [callback]', function(done) {
        localforage.key(0, function(key) {
            expect(key).toEqual(null);

            done();
        });
    });

    it('returns null with empty db using key() [promise]', function(done) {
        localforage.key(0).then(function(key) {
            expect(key).toEqual(null);

            done();
        });
    });

    it('returns key name using key() [callback]', function(done) {
        localforage.setItem('officeName', 'Initech').then(function() {
            localforage.key(0, function(key) {
                expect(key).toEqual('officeName');

                done();
            });
        });
    });

    it('returns key name using key() [promise]', function(done) {
        localforage.setItem('officeName', 'Initech').then(function() {
            localforage.key(0).then(function(key) {
                expect(key).toEqual('officeName');

                done();
            });
        });
    });

    it('removes an item with removeItem() [callback]', function(done) {
        localforage.setItem('officeName', 'Initech', function() {
            localforage.setItem('otherOfficeName', 'Initrode', function() {
                localforage.removeItem('officeName', function() {
                    localforage.getItem('officeName', function(emptyValue) {
                        expect(emptyValue).toEqual(null);

                        localforage.getItem('otherOfficeName', function(value) {
                            expect(value).toEqual('Initrode');

                            done();
                        });
                    });
                });
            });
        });
    });

    it('removes an item with removeItem() [promise]', function(done) {
        localforage.setItem('officeName', 'Initech').then(function() {
            return localforage.setItem('otherOfficeName', 'Initrode');
        }).then(function() {
            return localforage.removeItem('officeName');
        }).then(function() {
            localforage.getItem('officeName').then(function(emptyValue) {
                expect(emptyValue).toEqual(null);

                localforage.getItem('otherOfficeName').then(function(value) {
                    expect(value).toEqual('Initrode');

                    done();
                });
            });
        });
    });

    it('removes all items with clear() [callback]', function(done) {
        localforage.setItem('officeName', 'Initech', function() {
            localforage.setItem('otherOfficeName', 'Initrode', function() {
                localforage.length(function(length) {
                    expect(length).toEqual(2);

                    localforage.clear(function() {
                        localforage.getItem('officeName', function(value) {
                            expect(value).toEqual(null);

                            localforage.length(function(length) {
                                expect(length).toEqual(0);

                                done();
                            });
                        });
                    });
                });
            });
        });
    });

    it('removes all items with clear() [promise]', function(done) {
        localforage.setItem('officeName', 'Initech').then(function() {
            return localforage.setItem('otherOfficeName', 'Initrode');
        }).then(function() {
            localforage.length().then(function(length) {
                expect(length).toEqual(2);

                localforage.clear().then(function() {
                    localforage.getItem('officeName').then(function(value) {
                        expect(value).toEqual(null);

                        localforage.length().then(function(length) {
                            expect(length).toEqual(0);

                            done();
                        });
                    });
                });
            });
        });
    });

    it('has a length after saving an item [callback]', function(done) {
        localforage.length(function(length) {
            expect(length).toEqual(0);
            localforage.setItem('great rapper', 'Black Thought', function() {
                localforage.length(function(length) {
                    expect(length).toEqual(1);

                    done();
                });
            });
        });
    });

    it('has a length after saving an item [promise]', function(done) {
        localforage.length().then(function(length) {
            expect(length).toEqual(0);
            localforage.setItem('lame rapper', 'Vanilla Ice').then(function() {
                localforage.length(function(length) {
                    expect(length).toEqual(1);

                    done();
                });
            });
        });
    });
});
