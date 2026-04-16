import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(express.json());

// Servindo arquivos estáticos (CSS, JS do front)
// Como o app.js está dentro de 'src', a pasta 'views' está no mesmo nível
app.use(express.static(path.join(__dirname, "views")));

// Rota para o seu HTML
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Exportamos o 'app' configurado, mas sem o .listen()
export default app;
