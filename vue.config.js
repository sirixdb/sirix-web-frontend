module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",

  productionSourceMap: false, //remove build map
  devServer: {

    port: 9430,
    proxy: "http://localhost:3002"

  },

};