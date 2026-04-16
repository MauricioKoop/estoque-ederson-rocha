import app from "./src/app.js";
import connectDB from "./src/database/db.js";
import dotenv from "dotenv";
import { EstoqueController } from "./src/controllers/EstoqueController.js";

dotenv.config();

// Liga o banco de dados
connectDB();

const PORT = process.env.PORT || 3000;

// Liga o servidor
app.listen(PORT, () => {
	console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

// const estoque = new EstoqueController();

// estoque.adicionarNovoMaterial(123, "Mouse Logitech com fio", 5);
// estoque.adicionarNovoMaterial(124, "Caixa de som Logitech com fio", 7);
// estoque.adicionarNovoMaterial(125, "Teclado Logitech com fio", 3);

// estoque.exibirEstoqueCompleto();

// estoque.removerMaterialEstoque(123, 4);
// estoque.alteraNomeMaterial(123, "PC Gamer PICHAU");
// estoque.exibirEstoqueCompleto();
