module.exports = function cached(func){
    let res, called = false
    return () => {
        if (!called){
            res = func()
            called = true
        }

        return res
    }
}

