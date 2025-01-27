import { ModuleFederationPlugin } from '@module-federation/enhanced/webpack';

const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  webpack: (config, options) => {
    config.plugins.push(
      new ModuleFederationPlugin({
        name: 'producer',
        filename: 'remoteEntry.js',
        exposes: {
          './button': './src/components/button.tsx',
        },
        shared: {
          react: {
            singleton: true,
            requiredVersion: false,
          },
        },
      }),
    );
    return config;
  },
};

export default nextConfig;
