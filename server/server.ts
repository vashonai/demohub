import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../src/lib/auth";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Mount better-auth handler
app.all("/api/auth/*", toNodeHandler(auth));

// Other middleware
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../dist");
  app.use(express.static(distPath));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
  
  app.listen(PORT, () => {
    console.log(`Production server running on port ${PORT}`);
  });
} else {
  import("vite").then(async (vite) => {
    const viteServer = await vite.createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    app.use(viteServer.middlewares);

    app.listen(PORT, () => {
      console.log(`Development server running on http://localhost:${PORT}`);
    });
  });
}
