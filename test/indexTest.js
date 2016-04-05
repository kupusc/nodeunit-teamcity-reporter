/**
 * Created by skoblins on 4/5/16.
 */

var teamcityReporter = require("./../index");

module.exports = {
    test1: function(test) {
        //test.done(false);
        teamcityReporter.run(['./test/exampleTests.js']);
        //test.equals(4,4);
        test.done();
    }
};
