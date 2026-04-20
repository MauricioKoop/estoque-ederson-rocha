import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/", (req, res) => {
	// Aqui você volta um nível (..) porque está dentro de 'routes'
	res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

router.get("/cadastro-material", (req, res) => {
	res.sendFile(path.join(__dirname, "..", "views", "cadastro-material.html"));
});

router.get("/movimenta-material", (req, res) => {
	res.sendFile(
		path.join(__dirname, "..", "views", "movimenta-material.html"),
	);
});

export default router;
