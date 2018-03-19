
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


const packer = new nspack(config)
~(async () => {
    debug("======================== begin pack1... ===========================")
    const r1 = await packer.build()
    debug("======================== done pack1. ===========================")
    console.log(r1.summary())


    touchSync(path.join(__dirname, 'src/about.vue'))
    touchSync(path.join(__dirname, 'src/tests/es6-module.vue'))

    debug("======================== begin pack2... ===========================")
    const r2 = await packer.build()
    debug("======================== done pack2. ===========================")
    console.log(r2.summary())

    // expect: pack2 no result.
})()

function touchSync(filepath){
    require('touch').sync(filepath)
}



