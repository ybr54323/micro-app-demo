module.exports = {
  transpileDependencies: true,
  publicPath: '/sub-b/',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  }
}
