
process.on('uncaughtException', function (err) {
    console.log("\nUncaught exception: ", err);
    console.log("\n", err.stack);
    process.exit(2); // 早死早超生
});

process.on('unhandledRejection', function (err) {
    console.log("\nUncaught rejection: ", err);
    console.log("\n", err.stack);
    process.exit(3); // 早死早超生
});


const gulp = require('gulp')
const gutil = require('gulp-util')
const runSequence = require('run-sequence')
const nspack = require('nspack')

gulp.task('default', function(done){
    return runSequence('build', done)
})

gulp.task('build', function(){
    return nspack(require('./nspack.config'))
})


