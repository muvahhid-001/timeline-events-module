const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const isDev = process.env.NODE_ENV !== "production";

module.exports = {
  entry: path.resolve(__dirname, "src/index.tsx"),

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isDev ? "[name].js" : "[name].[contenthash].js",
    clean: true,
    publicPath: "/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },

      // SCSS Modules
      {
        test: /\.module\.s?css$/i,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: isDev
                  ? "[local]__[hash:base64:5]"
                  : "[hash:base64]",
              },
              esModule: false,
            },
          },
          "sass-loader",
        ],
      },

      // Global SCSS
      {
        test: /\.s?css$/i,
        exclude: /\.module\.s?css$/i,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },

      // Static assets (images/fonts)
      {
        test: /\.(png|jpe?g|gif|svg|webp|woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      minify: !isDev && {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    ...(!isDev
      ? [new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" })]
      : []),
    ...(process.env.ANALYZE === "true" ? [new BundleAnalyzerPlugin()] : []),
  ],

  devtool: isDev ? "inline-source-map" : false,

  devServer: {
    static: path.resolve(__dirname, "public"),
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
};
