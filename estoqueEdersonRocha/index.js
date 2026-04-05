import { EstoqueController } from "./src/controllers/EstoqueController.js";

const app = new EstoqueController();

app.adicionarNovoMaterial(123, "Mouse Logitech com fio", 5);
app.adicionarNovoMaterial(124, "Caixa de som Logitech com fio", 7);
app.adicionarNovoMaterial(125, "Teclado Logitech com fio", 3);

app.exibirEstoqueCompleto();

const timer = setTimeout(() => {
	app.removerMaterialEstoque(123, 4);
	app.alteraNomeMaterial(123, "PC Gamer PICHAU");
	app.exibirEstoqueCompleto();
}, 5000);
