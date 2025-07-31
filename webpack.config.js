const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = process.env.NODE_ENV !== "production";

module.exports = {
  entry: "@/index.tsx",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isDev ? "[name].js" : "[name].[contenthash].js",
    clean: true,
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
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/i,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: !isDev && {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),

    ...(isDev
      ? []
      : [new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" })]),
  ],

  devtool: isDev ? "inline-source-map" : false,

  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 3000,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
};
