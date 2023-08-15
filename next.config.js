const webpack = require('webpack');
const {URL} = require('url');

const imgDomains = ['media.Boundless-commerce.com'];
if (process.env.Boundless_MEDIA_SERVER) {
  const imgUrl = new URL(process.env.Boundless_MEDIA_SERVER);
  imgDomains.push(imgUrl.host);
}

module.exports = {
  images: {
    domains: [],
  },
  webpack: (config) => {
    const defineMap = {};

    [
      'Boundless_BASE_URL',
      'Boundless_API_BASE_URL',
      'Boundless_API_PERMANENT_TOKEN',
      'Boundless_S3_PREFIX',
      'Boundless_INSTANCE_ID',
      'Boundless_PRODUCTS_IMAGE_PROPORTION',
      'Boundless_MEDIA_SERVER',
    ].forEach(
      (key) =>
        (defineMap[`process.env.${key}`] = JSON.stringify(process.env[key])),
    );

    config.plugins.push(new webpack.DefinePlugin(defineMap));

    return config;
  },
};

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true'
// });

// module.exports = withBundleAnalyzer({});
