const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

const webpack = require('webpack')
module.exports = {

  "publicPath": "/",
  "assetsDir": "static",
  "indexPath": "templates/index.html",
  configureWebpack: {
      plugins: [
        new webpack.IgnorePlugin({
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/
        })
      ]
  },
  "filenameHashing": true,

  "devServer": {
    "proxy": {
      "^/api": {
        "target": "http://127.0.0.1:8000",
        "ws": true,
        "changeOrigin": true
      },
      "^/get_all_ex": {
        "target": "http://127.0.0.1:8000",
        "ws": true,
        "changeOrigin": true
      },
      "^/admin": {
        "target": "http://127.0.0.1:8000",
        "ws": true,
        "changeOrigin": true
      },
      "^/media": {
        "target": "http://127.0.0.1:8000",
        "ws": true,
        "changeOrigin": true
      },
      "^/static": {
        "target": "http://127.0.0.1:8000",
        "ws": true,
        "changeOrigin": true
      },
        "^/accounts/login": {
        "target": "http://127.0.0.1:8000",
        "ws": true,
        "changeOrigin": true
      },
      "^/accounts/loginuser": {
        "target": "http://127.0.0.1:8000",
        "ws": true,
        "changeOrigin": true
      },
      "^/accounts/registrationuser": {
        "target": "http://127.0.0.1:8000",
        "ws": true,
        "changeOrigin": true
      }
    }
  },

  "transpileDependencies": [],

  productionSourceMap: false,

}