import { init, loadRemote } from "@module-federation/enhanced/runtime";
import React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

init({
  name: "shell",
  remotes: [
    {
      name: "producer",
      entry: "http://localhost:3000/_next/static/chunks/remoteEntry.js",
    },
  ],
  shared: {
    react: {
      // version: "18.3.1",
      // scope: "default",
      lib: () => React,
      // shareConfig: {
      //   singleton: true,
      //   requiredVersion: "^18.3.1",
      // },
    },
    "react-dom": {
      // version: "18.3.1",
      // scope: "default",
      lib: () => ReactDOM,
      // shareConfig: {
      //   singleton: true,
      //   requiredVersion: "^18.3.1",
      // },
    },
  },
});

function useDynamicImport(): React.FC | null {
  const [component, setComponent] = useState(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        const { default: Component } = (await loadRemote(
          "producer/button"
        )) as { default: any };
        setComponent(() => Component);
      } catch (error) {}
    };

    loadComponent();
  }, []);

  return component;
}

export default function Home() {
  const Comp = useDynamicImport();
  return (
    <div
      className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <h1>Hello There</h1>
      {Comp && <Comp />}
    </div>
  );
}
