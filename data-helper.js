"use strict";

// Simulates the kind of delay we see with network or filesystem operations

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
    return {
        // Saves a tweet to `db`
        saveUser: function(user, callback) {
            callback(null, true);
        },
        // Get all tweets in `db`, sorted by newest first
        getUser: function(callback) {
            callback(null, tweets);
        }
    };
}