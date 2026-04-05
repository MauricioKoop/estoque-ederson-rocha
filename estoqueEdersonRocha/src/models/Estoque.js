export class Estoque {
	constructor() {
		this.estoque = [];
	}

	// Método de retirada do estoque
	retiraDoEstoque(idCodigoNumerico, quantidade) {
		if (this.estoque.length > 0) {
			const material = this.estoque.find(
				(material) => material.codigoNumerico === idCodigoNumerico,
			);

			if (material) {
				material.saldoEstoque -= quantidade;
				if (material.saldoEstoque <= 0) material.saldoEstoque = 0;
			} else {
				console.log("Material não encontrado para remover!");
			}
		}
	}

	//Adiciona ao estoque
	adicionaAoEstoque(novoMaterial) {
		// Se o novo material já existir dentro do estoque guardamos a posição desse material.
		const indexMaterial = this.estoque.findIndex(
			(item) => item.codigoNumerico === novoMaterial.codigoNumerico,
		);

		//Se > -1 o Material já existe, então incrementa o estoque
		if (indexMaterial > -1) {
			this.estoque[indexMaterial].saldoEstoque +=
				novoMaterial.saldoEstoque;
			console.log(
				"Material já existe no estoque, saldo em estoque do material foi atualizado!",
			);
			// senão adiciona o novo material ao estoque
		} else {
			this.estoque.push(novoMaterial);
			console.log(
				"O Material não existe na base de estoque, material adicionado com sucesso!",
			);
		}
	}

	// Exibe todos os materiais do estoque
	exibeEstoqueCompleto() {
		console.log("Exibe o array de objetos estoque");
		console.log(this.estoque);
	}
}
