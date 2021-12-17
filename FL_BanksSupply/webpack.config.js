const path = require('path');
const fs = require('fs');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

//GENERATE HTML PAGES
function generateHtmlPages(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));

  return templateFiles.map(function (item) {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];

    return new HtmlWebpackPlugin({
      filename: `${name}.${extension}`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      minify: {
        removeComments: false,
        collapseWhitespace: false,
      },
    });
  });
}
const htmlPages = generateHtmlPages('./src/templates');
const config = {
  entry: './src/index.js',
  plugins: [].concat(htmlPages),

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            sourceMap: true,
          },
        },
      },
      {
        test: /\.(png|jpg?g|gif|svg|jpeg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/img',
            esModule: false,
          },
        },
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/fonts',
          },
        },
      },
      {
        test: /\.(mp4|ogg|webm)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/video',
          },
        },
      },
      {
        test: /\.pdf$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/pdf',
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              esModule: false,
              minimize: false,
              sources: {
                list: [
                  {
                    tag: 'img',
                    attribute: 'src',
                    type: 'src',
                  },
                  {
                    tag: 'link',
                    attribute: 'href',
                    type: 'src',
                  },
                  {
                    tag: 'video',
                    attribute: 'src',
                    type: 'src',
                  },
                  {
                    tag: 'source',
                    attribute: 'src',
                    type: 'src',
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
};

module.exports = (_, argv) => {
  if (argv.mode === 'development') {
    config.output = {
      publicPath: '/',
      filename: 'assets/js/[name].js',
    };
    config.target = 'web';

    config.module.rules.push({
      test: /\.(s[ac]|c)ss$/i,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'postcss-loader',
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    });
  }

  //FOR PRODUCTION
  if (argv.mode === 'production') {
    config.mode = 'production';
    config.output = {
      path: path.resolve(__dirname, 'out'),
      filename: 'assets/js/bundle.js',
    };

    config.plugins.push(
      // new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'assets/css/bundle.css',
      }),
      new ImageMinimizerPlugin({
        minimizerOptions: {
          // Lossless optimization with custom option
          // Feel free to experiment with options for better result for you
          plugins: [['mozjpeg', { quality: 65 }], ['pngquant']],
        },
      })
    );
    config.module.rules.push({
      test: /\.(s[ac]|c)ss$/i,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: (resourcePath, context) => {
              // publicPath is the relative path of the resource to the context
              // e.g. for ./css/admin/main.css the publicPath will be ../../
              // while for ./css/main.css the publicPath will be ../
              return path.relative(path.dirname(resourcePath), context) + '/';
            },
          },
        },
        'css-loader',
        'postcss-loader',
        'sass-loader',
      ],
    });
  }

  return config;
};
