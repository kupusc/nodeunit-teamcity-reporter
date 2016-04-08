/**
 * Created by skoblins on 4/5/16.
 */

module.exports = {
    "suite1": {
        testPass: function (test) {
            //test.done(false);
            test.equals(4, 4);
            test.done();
        },
        testFail: function (test) {
            //test.done(false);
            test.equals(4, 3);
            test.done();
        }
    },
    "suite2": {
        testPass: function (test) {
            //test.done(false);
            test.equals(4, 4);
            test.done();
        },
        testFail: function (test) {
            //test.done(false);
            test.equals(4, 3);
            test.equals(4, -1);
            throw new Error('kupadupa');
            test.done();
        }
    }
};
