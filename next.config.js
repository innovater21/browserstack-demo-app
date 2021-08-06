const optimizedImages = require('next-optimized-images');
const withStyles = require('@webdeb/next-styles')
const withPlugins = require('next-compose-plugins');
const webpack = require('webpack');

const { withSentryConfig } = require('@sentry/nextjs');

const sassConfig = {
  sass: true, // use .scss files
  modules: true // style.(m|module).css & style.(m|module).scss for module files
}

const optimizedImagesConfig = {
  inlineImageLimit: 8192,
  imagesFolder: 'images',
  imagesName: '[name]-[hash].[ext]',
  optimizeImagesInDev: false,
  mozjpeg: {
    quality: 80
  },
  optipng: {
    optimizationLevel: 3
  },
  pngquant: false,
  gifsicle: {
    interlaced: true,
    optimizationLevel: 3
  },
  svgo: {
    // enable/disable svgo plugins here
  },
  webp: {
    preset: 'default',
    quality: 75
  }
};

const nextConfiguration = {
  webpack: config => {
    config.plugins.push(
      new webpack.DefinePlugin({
        PC: JSON.stringify('pc')
      })
    );
    return config;
  },
};

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};


module.exports = withPlugins([
  [withStyles, sassConfig],
  [optimizedImages, optimizedImagesConfig],
  [withSentryConfig, SentryWebpackPluginOptions]
], nextConfiguration);
