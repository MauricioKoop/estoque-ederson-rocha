import express from "express";
import EstoqueController from "../controllers/EstoqueController.js";

const router = express.Router();

//endpoitn para cadastrar um novo material no banco de dados
router.post("/", EstoqueController.adicionarNovoMaterial);
router.get("/", EstoqueController.exibirEstoqueCompleto);
router.patch("/quantidade", EstoqueController.removerQuantidadeMaterial);
router.patch("/nome", EstoqueController.alteraNomeMaterial);
router.delete("/", EstoqueController.deletarMaterialEstoque);

export default router;
