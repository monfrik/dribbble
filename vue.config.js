module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://gallery.dev.webant.ru',
                ws: true,
                changeOrigin: true
            },
            '^/oauth': {
                target: 'http://gallery.dev.webant.ru',
                ws: true,
                changeOrigin: true
            },
        }
    }
  }