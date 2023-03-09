const path = require("path");
const { getLoader, loaderByName, addAfterLoader } = require("@craco/craco");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const packages = [];
const libs = [];
packages.push(path.join(__dirname, "../ui"));
packages.push(path.join(__dirname, "../hooks"));
libs.push(path.join(__dirname, "../macisdk"));

module.exports = {
  webpack: {
    // plugins: [new BundleAnalyzerPlugin({ analyzerMode: "server" })],
    configure: (webpackConfig, arg) => {
      const { isFound, match } = getLoader(webpackConfig, loaderByName("babel-loader"));
      if (isFound) {
        const include = Array.isArray(match.loader.include) ? match.loader.include : [match.loader.include];

        match.loader.include = include.concat(packages);
      }

      // //NOTE: configure ts loader
      // const tsLoader = {
      //   test: /\.tsx?$/,
      //   loader: 'ts-loader',
      //   include: libs,
      //   options: { transpileOnly: true },
      // };
      // const { isAdded: tsLoaderIsAdded } = addAfterLoader(
      //   webpackConfig,
      //   loaderByName("ts-loader"),
      //   tsLoader // babel-loader
      // );
      // console.log("tsLoaderIsAdded", tsLoaderIsAdded);

      return webpackConfig;
    },
  },
};
