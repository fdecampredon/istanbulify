/*jshint node: true*/

var log = require('./file2');

for (var i = 0; i < 10; i++) {
    if (i > 10) {
        log('i > 10');
    }
    log('i = ' + i); 
}
