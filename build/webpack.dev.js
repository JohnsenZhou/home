const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.common')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development'
})