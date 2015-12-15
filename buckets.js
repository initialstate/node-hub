'use strict';

var IS = require('initial-state');

var localKey = '',
	cache = {};

var onBucketError = function (error) {
	// handle an error from a cached bucket

	console.error('Bucket "' + this.id + '" Error:', error);
};

exports.get = function getBucket(id) {
	// get bucket from cache; if needed, create bucket.

	if (!cache.hasOwnProperty(id)) {
		// bucket is not in cache. So, create and add it.
		cache[id] = IS.bucket(id, localKey)
			.on('error', onBucketError);
	}
	// return cached bucket
	return cache[id];
};

exports.setAccessKey = function (key) {
	// This will set the access key used for all future events

	if (localKey !== key) {
		// clear cache
		cache = {};
		// set new key
		localKey = key;
	}
};
