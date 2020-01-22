module.exports = {
    configureWebpack: {
        devtool: 'source-map', // 开启chrome与vue调试
    },
    devServer: {
        open: true, // 启动时自动打开浏览器
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8765/', // 对应自己的接口
                changeOrigin: true,
                ws: true,
                secure: false,
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
}