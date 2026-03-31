import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ isSsrBuild }) => ({
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
  build: {
    outDir: "dist/client",
    ...(isSsrBuild && {
      rollupOptions: {
        output: {
          format: "es",
        },
      },
    }),
  },
  ...(isSsrBuild && {
    ssr: {
      noExternal: true,
      target: "webworker",
    },
  }),
}));
