
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


const nspack = require('nspack')
nspack(require('./nspack.config'))
    .then(res => console.log(res.summary()))


