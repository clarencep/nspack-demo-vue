module.exports = function(scriptUrl, options){
    const {timeout=15000} = options || {}

    return new Promise((resolve, reject) => {
        const head = document.getElementsByTagName('head')[0]
        if (!head){
            reject(new Error("Cannot find the head element!"))
        }

        const scriptTag = document.createElement('script')
        scriptTag.onload = scriptTag.onreadystatechange = function(){
            if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete'){
                resolve(scriptTag)

                // avoid memory leak in IE
                scriptTag.onload = scriptTag.onreadystatechange = null
            }
        }

        scriptTag.onerror = reject
        scriptTag.src = scriptUrl

        setTimeout(() => reject(new Error("Timeout when loading script " + scriptUrl)), timeout)

        head.appendChild(scriptTag)
    })
}

