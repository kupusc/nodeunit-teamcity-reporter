/**
 * Created by skoblins on 4/5/16.
 */
"use strict";

var path = require('path');
var nodeunit = require('nodeunit');
var tsm = require('teamcity-service-messages');
var util = require('util');

function betterErrors(assertion) {
    return util.inspect(assertion);
}

exports.info = "NodeUnit / Team-city reporter";

exports.run = function (files, options, callback) {
    var opts = {
        moduleStart: function (name) {
            tsm.testSuiteStarted({name: name});
        },
        moduleDone: function (name, assertions) {
            tsm.testSuiteFinished({name: name});
        },
        testStart: function (name) {
            tsm.testStarted({ name: name });
        },
        testDone: function (name, assertions) {
            var details = [];
            if (assertions.failures()) {
                assertions.forEach(function (a) {
                    if (a.failed()) {
                        var ba = betterErrors(a);
                        details.push('\n\n------ detail ---------\n');
                        details.push(ba);
                    }
                    a.testname = name;
                });
                tsm.testFailed({name: name, details: details});
            }
            tsm.testFinished({name: name});
        },
        done: function(assertions){
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
