import { Material } from "../models/Material.js";
import { Estoque } from "../models/Estoque.js";

export class EstoqueController {
	constructor() {
		this.estoquePrincipal = new Estoque();
	}

	//altera o nome do material
	alteraNomeMaterial(idMaterial, novoNomeMaterial) {
		if (this.estoquePrincipal.estoque.length > 0) {
			const material = this.estoquePrincipal.estoque.find((material) => {
				if (idMaterial === material.codigoNumerico) {
					material.setNomeMaterial(novoNomeMaterial);
				}
			});
		}
	}

	//metodo para adicionar um material novo no estoque
	adicionarNovoMaterial(codigo, nomeMaterial, qnt) {
		const novoItem = new Material(codigo, nomeMaterial, qnt);
		this.estoquePrincipal.adicionaAoEstoque(novoItem);
	}

	//metodo para remover um material do estoque
	removerMaterialEstoque(codigo, qnt) {
		this.estoquePrincipal.retiraDoEstoque(codigo, qnt);
	}

	//Metodo para exibir todo estoque
	exibirEstoqueCompleto() {
		this.estoquePrincipal.exibeEstoqueCompleto();
	}
}
