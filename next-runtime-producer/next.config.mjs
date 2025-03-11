// import { ModuleFederationPlugin } from "@module-federation/enhanced/webpack";
import { NextFederationPlugin } from "@module-federation/nextjs-mf";

const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  webpack: (config, options) => {
    // console.log({ config, options });

    if (!options.isServer) {
      config.output.library = "producer"; // Optional: Set a name
      config.output.libraryTarget = "var"; // or "umd" for broader compatibility
      config.plugins.push(
        new NextFederationPlugin({
          name: "producer",
          filename: "static/chunks/remoteEntry.js",
          exposes: {
            "./button": "./src/components/button.tsx",
          },
          shared: {},
          entryGlobalName: "remote",
        })
      );
    }
    return config;
  },
};

export default nextConfig;
