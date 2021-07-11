let proxyObj = {
    "/": {
        //是否启用websocket代理
        ws:false,
        // 目标地址
        target: "http://localhost:9921",
        changeOrigin: true, // 是否改变域名
        pathRewrite:{
            '^/':'/'
        }
    }
}

module.export = {
    // devServer: {
    //     host: "localhost",
    //     port: 8080,
    //     proxy: proxyObj
    // }
}