
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

const debug = require('debug')('demo')

debug("loading nspack...")
const nspack = require('nspack')

debug("loading config...")
const config = require('./nspack.config')

debug("begin nspack watching...")
new nspack(config)
    .watch(
        // doneCallback: async? (err:Error, res:NSPackBuiltResult) => void
        (err, res) => {
            if (err){
                debug("nspack finished with error:", res)
                return
            }
            debug("done nspack.")
            console.log(res.summary())
        },
        // beginCallback: async? (void) => void
        () => {
            debug("begin nspack...")
        }
    )


