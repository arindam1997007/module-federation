import { init, loadRemote } from "@module-federation/enhanced/runtime";
import { useEffect } from "react";

init({
  name: "shell",
  remotes: [
    {
      name: "remote",
      entry: "http://localhost:3000/_next/static/chunks/remoteEntry.js",
    },
  ],
});

export default function Home() {
  useEffect(() => {
    const loadRemoteApp = async () => {
      try {
        const module = await loadRemote("remote/button");
        if (!module) return;

        console.log({ module });
      } catch (error) {
        console.error("Error loading the Remote:", error);
      }
    };

    loadRemoteApp();
  }, []);
  return (
    <div
      className={`grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <h1>Hello There</h1>
    </div>
  );
}
