export class Material {
	constructor(codigoNumerico, nomeMaterial, saldoEstoque) {
		this.codigoNumerico = codigoNumerico;
		this.nomeMaterial = nomeMaterial;
		this.saldoEstoque = saldoEstoque;
		this.data = new Date();
	}

	//Metodo seter para alterar o nome do material
	setNomeMaterial(novoNomeMaterial) {
		this.nomeMaterial = novoNomeMaterial;
	}

	//Exibe os dados do material
	dadosDoMaterial() {
		console.log(`Codigo Numérico: ${this.codigoNumerico}`);
		console.log(`Nome do material: ${this.nomeMaterial}`);
		console.log(`Saldo em estoque: ${this.saldoEstoque}`);
		console.log(`A data da publicação do material é ${this.data}`);
	}
}
