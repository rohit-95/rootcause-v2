const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    mode: isProd ? "production" : "development",
    entry: path.resolve(__dirname, "src/rootcause-root-config.js"),
    output: {
      filename: "rootcause-root-config.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: isProd ? "https://cdn.rootcausedaily.com/" : "http://localhost:9000/",
      // Output as ES module so native `import` works in the browser
      // Required for import maps and dynamic import() of micro-apps to work
      library: { type: "module" },
    },
    // Required to enable ES module output in webpack
    experiments: { outputModule: true },
    // Tell webpack: externals are ES modules, use `import` not `require()`
    externalsType: "module",
    devServer: {
      port: 9000,
      historyApiFallback: true,
      headers: {
        // Allow micro-apps running on other ports to be loaded
        "Access-Control-Allow-Origin": "*",
      },
      static: {
        directory: path.resolve(__dirname, "src/styles"),
        publicPath: "/css",
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react"],
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        // index.ejs is the main HTML shell — single-spa reads the import-map from here
        template: path.resolve(__dirname, "src/index.ejs"),
        filename: "index.html",
        // Inject the bundle as a module script so import maps work
        scriptLoading: "module",
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve(__dirname, "src/styles"), to: "css" },
        ],
      }),
    ],
    resolve: {
      extensions: [".js", ".jsx"],
    },
    /*
      EXTERNALS — tell webpack "don't try to bundle these, the browser
      will resolve them at runtime using the import map in index.ejs".
      Any import starting with @rootcause/ or single-spa is treated as external.
    */
    externals: [
      /^single-spa$/,
      /^@rootcause\/.+$/,
    ],
  };
};
