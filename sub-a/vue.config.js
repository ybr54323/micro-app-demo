module.exports = {
  transpileDependencies: true,
  publicPath: '/sub-a/',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }
}
