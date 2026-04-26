import MaterialModel from "../models/material.model.js";

export class EstoqueController {
	//método para adicionar um novo material
	async adicionarNovoMaterial(req, res) {
		try {
			const { codigoNumerico, nomeMaterial, saldoEstoque } = req.body;

			// 1. Verifica se o material já existe (equivalente ao seu findIndex)
			const material = await MaterialModel.findOne({ codigoNumerico });

			if (material) {
				//adiciona ao estoque
				material.saldoEstoque += Number(saldoEstoque);
				await material.save();
				return res.status(200).json({
					message: `<p>O material "${material.nomeMaterial}" já existe. Saldo atualizado para ${material.saldoEstoque} unidades.</p>`,
					material,
				});
			}

			//Se não existe cria um novo material
			const novoMaterial = new MaterialModel({
				codigoNumerico,
				nomeMaterial,
				saldoEstoque,
			});
			await novoMaterial.save();

			res.status(200).json({
				message: "Material criado com sucesso!",
				novoMaterial,
			});
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}

	//metodo para listar todo estoque
	async exibirEstoqueCompleto(req, res) {
		try {
			const { codigoNumerico, data } = req.query; // Pega os filtros da URL
			let busca = {}; // Objeto que será passado ao Mongoose

			// 1. Se informou o código, adiciona ao filtro
			if (codigoNumerico) {
				busca.codigoNumerico = codigoNumerico;
			}

			// 2. Se informou a data, precisamos filtrar pelo intervalo do dia
			if (data) {
				const inicioDia = new Date(`${data}T00:00:00`);
				const fimDia = new Date(`${data}T23:59:59`);

				// Filtra materiais criados entre 00:00 e 23:59 desse dia
				busca.data = { $gte: inicioDia, $lte: fimDia };
			}

			// Busca no banco com o filtro dinâmico (se vazio, traz tudo)
			const listaEstoque = await MaterialModel.find(busca);

			res.status(200).json(listaEstoque);
		} catch (error) {
			res.status(500).send({ error: error.message });
		}
	}

	//metodo para remover do estoque
	async removerQuantidadeMaterial(req, res) {
		try {
			const { codigoNumerico, quantidade } = req.body;

			const material = await MaterialModel.findOne({ codigoNumerico });

			if (!material) {
				return res
					.status(401)
					.json({ message: "Material não encontrado!" });
			}

			//Diminui a quantidade em estoque do material e impede que seja negativo
			material.saldoEstoque -= Number(quantidade);
			if (material.saldoEstoque < 0) material.saldoEstoque = 0;

			await material.save();
			res.status(200).json({
				message: `<p>Saída registrada no produto ${material.nomeMaterial}, Saldo atualizado = ${material.saldoEstoque}</p>`,
				material,
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	//metodo para alterar o nome do Material
	async alteraNomeMaterial(req, res) {
		try {
			const { codigoNumerico, novoNome } = req.body;

			const material = await MaterialModel.findOne({ codigoNumerico });

			if (material) {
				material.nomeMaterial = novoNome;
				await material.save();
				return res.status(200).json({
					message: `<p>Você alterou o nome do material para ${material.nomeMaterial}</p>`,
					material,
				});
			}

			res.status(401).json({ message: "Material não encontrado" });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}

	//deletar um material do estoque
	async deletarMaterialEstoque(req, res) {
		try {
			const { codigoNumerico } = req.body;

			const materialExcluido = await MaterialModel.findOneAndDelete({
				codigoNumerico,
			});

			if (!materialExcluido) {
				return res.status(401).json({
					message: "Material não encontrado para exclusão!",
				});
			}

			res.status(200).json({
				message: `O Material ${materialExcluido.nomeMaterial} foi Excluído definitivamente`,
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}

export default new EstoqueController();
