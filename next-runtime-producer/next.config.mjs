import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  webpack: (config, options) => {
    // console.log({ config, options });

    if (!options.isServer) {
      config.output.library = "producer";
      config.output.libraryTarget = "var";
      config.plugins.push(
        new NextFederationPlugin({
          name: "producer",
          filename: "static/chunks/remoteEntry.js",
          exposes: {
            "./button": "./src/components/button.tsx",
          },
          shared: {
            react: {
              singleton: true,
              requiredVersion: false,
            },
            "react-dom": {
              requiredVersion: false,
              singleton: true,
            },
          },
          entryGlobalName: "remote",
        })
      );
    }
    return config;
  },
};

export default nextConfig;
