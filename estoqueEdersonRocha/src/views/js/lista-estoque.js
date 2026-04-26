import { API_ESTOQUE } from "./api.js";

document.addEventListener("DOMContentLoaded", (event) => {
	const elEstoqueVazio = document.getElementById("erroEstoqueVazio");

	(async function () {
		try {
			let response = await fetch(API_ESTOQUE);

			if (!response.ok) {
				throw new Error(`Erro na requisição: ${response.status}`);
			}

			const materiais = await response.json();

			if (materiais.length > 0) {
				montaTabelaDeEstoque(materiais);
			}

			//exibe a mensagem de erro se não possuir produtos no estoque
			exibeMensagemEstoqueVazio(materiais);
		} catch (error) {
			console.log("Error: " + error);
		}
	})();

	const formBuscaDados = document.getElementById("form-busca-dados");

	formBuscaDados.addEventListener("submit", async (e) => {
		e.preventDefault();

		//captura os valores dos campos codigo material e data
		const codigoNumericoValue =
			document.getElementById("codigoNumerico").value;
		const dataValue = document.getElementById("dataMaterial").value;

		try {
			// 2. Monta a URL com Query Params (URLSearchParams facilita a limpeza de campos vazios)
			const params = new URLSearchParams();
			if (codigoNumericoValue)
				params.append("codigoNumerico", codigoNumericoValue);
			if (dataValue) params.append("data", dataValue);

			//monta a url completa
			const urlCompleta = `${API_ESTOQUE}?${params.toString()}`;

			let response = await fetch(urlCompleta);

			if (!response.ok) {
				throw new Error(`Erro na requisição: ${response.status}`);
			}

			const materiais = await response.json();
			// console.log(materiais);

			//exibe a mensagem de erro se não possuir produtos no estoque
			exibeMensagemEstoqueVazio(materiais);

			montaTabelaDeEstoque(materiais);
		} catch (error) {
			console.log("Error: " + error);
		}
	});

	function montaTabelaDeEstoque(materiais) {
		const elTabela = document.getElementById("lista-de-estoque");

		elTabela.innerHTML =
			"<tr><th>Código do Material</th><th>Nome do Material</th><th>Quantidade</th><th>Data</th></tr>";

		materiais.forEach((material) => {
			const tr = document.createElement("tr");

			let templateStringDadosTabela = `
                <tr>
                    <td>${material.codigoNumerico}</td>
                    <td>${material.nomeMaterial}</td>
                    <td>${material.saldoEstoque}</td>
					<td>${material.data}</td>
                </tr>
            `;

			tr.innerHTML = templateStringDadosTabela;

			elTabela.appendChild(tr);
		});
	}

	function exibeMensagemEstoqueVazio(materiais) {
		if (materiais.length == 0) {
			elEstoqueVazio.innerHTML =
				"Nenhum material cadastrado com essas informações!";
		}

		//limpa o formulario
		formBuscaDados.reset();
	}
});
