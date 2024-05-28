const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  redirects: async () => {
    return [
      {
        source: '/x',
        destination: 'https://twitter.com/notbenyam',
        permanent: true
      },
      {
        source: '/twitter',
        destination: 'https://twitter.com/notbenyam',
        permanent: true
      },
      {
        source: '/bephrem',
        destination: 'https://bephrem.com',
        permanent: true
      }
    ];
  },
  webpack: (config, { isServer }) => {
    // add the CopyPlugin only for the client build
    if (!isServer) {
      config.plugins.push(
        new CopyPlugin({
          patterns: [
            {
              from: 'node_modules/@ricky0123/vad-web/dist/vad.worklet.bundle.min.js',
              to: 'static/chunks/pages/[name][ext]'
            },
            {
              from: 'node_modules/@ricky0123/vad-web/dist/*.onnx',
              to: 'static/chunks/pages/[name][ext]'
            },
            {
              from: 'node_modules/onnxruntime-web/dist/*.wasm',
              to: 'static/chunks/pages/[name][ext]'
            }
          ]
        })
      );
    }

    return config;
  }
};
