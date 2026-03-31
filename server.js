import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5000;

async function createServer() {
  const app = express();

  let vite;
  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    const compression = (await import("compression")).default;
    const sirv = (await import("sirv")).default;
    app.use(compression());
    app.use(sirv(path.resolve(__dirname, "dist/client"), { extensions: [] }));
  }

  app.use("/{*path}", async (req, res) => {
    const url = req.originalUrl;
    try {
      let template, render;

      if (!isProduction) {
        template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.tsx")).render;
      } else {
        template = fs.readFileSync(path.resolve(__dirname, "dist/client/index.html"), "utf-8");
        const serverEntry = await import(path.resolve(__dirname, "dist/server/entry-server.js"));
        render = serverEntry.render;
      }

      const { html: appHtml, helmetContext } = await render(url);
      const { helmet } = helmetContext ?? {};
      const headTags = helmet
        ? [
            helmet.title?.toString() ?? "",
            helmet.meta?.toString() ?? "",
            helmet.link?.toString() ?? "",
            helmet.script?.toString() ?? "",
          ]
            .filter((s) => s.trim())
            .join("\n    ")
        : "";
      const html = template
        .replace("<!--ssr-head-->", headTags)
        .replace("<!--app-html-->", appHtml);

      res.status(200).set({ "Content-Type": "text/html" }).send(html);
    } catch (e) {
      if (vite) vite.ssrFixStacktrace(e);
      console.error(e.stack);
      res.status(500).end(e.message);
    }
  });

  app.listen(port, "0.0.0.0", () => {
    console.log(`SSR server running at http://localhost:${port}`);
  });
}

createServer();
