/**
 * Created by skoblins on 4/5/16.
 */
"use strict";

var path = require('path');
var nodeunit = require('nodeunit');

exports.info = "NodeUnit / Team-city reporter";

exports.run = function (files, options, callback) {
    var opts = {
        moduleStart: function (name) {
            console.log('teamcity: start module');
        },
        moduleDone: function (name, assertions) {
            console.log('teamcity: end module');
        },
        testStart: function (name) {
            console.log('teamcity: start test');
        },
        testDone: function (name, assertions) {
            console.log('teamcity: end test');
        },
        done: function (assertions) {
            if (assertions.failures()) {
                console.log('teamcity: done, failures');
            }
            else {
                console.log('teamcity: done, no failures');
            }

            if (callback) callback(assertions.failures() ? new Error('Tests failed') : undefined);
        }
    };

    if (files && files.length) {
        var paths = files.map(function (p) {
            return path.resolve(p);
        });
        nodeunit.runFiles(paths, opts);
    } else {
        nodeunit.runModules(files,opts);
    }
};
