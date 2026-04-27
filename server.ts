import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory storage for inquiries (Note: will reset on server restart)
  const inquiries: any[] = [];

  // API contact endpoint
  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    console.log("Contact form submission:", { name, email, message });
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    inquiries.push({
      id: Date.now(),
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    res.json({ success: true, message: "Strategic alignment request received." });
  });

  // API to fetch inquiries (Protected by simple header check for demo, real app would use JWT)
  app.get("/api/admin/inquiries", (req, res) => {
    const authHeader = req.headers['authorization'];
    if (authHeader !== 'Bek123') {
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.json(inquiries);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
