import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Importando as nossas novas rotas
import viewRoutes from "./routes/viewsRoutes.js";
import estoqueRoutes from "./routes/estoqueRoutes.js";

// Configuração necessária para o path funcionar dentro de src/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// --- MIDDLEWARES ---
app.use((req, res, next) => {
	console.log(`Request Type: ${req.method}`);
	console.log(`Content Type: ${req.headers["content-type"]}`);
	console.log(`Date: ${new Date()}`);
	next();
});

// 1. Permite que o Express entenda JSON (essencial para o CRUD)
app.use(express.json());

// 2. Serve arquivos estáticos (CSS, Imagens, JS do front) da pasta views
app.use(express.static(path.join(__dirname, "views")));

// --- ROTAS ---

// 3. Rotas de Páginas (HTML)
app.use("/", viewRoutes);

// 4. Rotas de Dados/API (JSON)
// Usamos o prefixo /api para separar bem o que é dado do que é tela
app.use("/api/estoque", estoqueRoutes);

export default app;
