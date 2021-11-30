const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/api', {
      target: 'https://api.zhangtong.work/minio-api',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    })
  )
}
