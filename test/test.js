/*jshint node:true*/

var test = require('tape').test;
var browserify = require('browserify');
var vm = require('vm');
var fs = require('fs');

test('test instrumentation', function (t) {
    t.plan(1);
    var expected = JSON.parse(fs.readFileSync(__dirname + '/expectedCoverage.json', 'UTF-8').replace(/\{\{dirname\}\}/g, __dirname));
    
    var b = browserify();
    b.add(__dirname + '/file1.js');
    b.transform(__dirname + '/..');
    b.bundle(function (err, src) {
        if (err) {
            t.fail(err);
        }
        var sandBox = {
            __coverage__: null,
            console: {
                log: function () { }
            }
        };
        vm.runInNewContext(src, sandBox);
        t.deepEqual(sandBox.__coverage__, expected);
    });

});
