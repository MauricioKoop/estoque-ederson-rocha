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
		const containerEstoque = document.getElementById("lista-de-estoque");

		containerEstoque.innerHTML = "";

		materiais.forEach((material) => {
			// Formata apenas para o padrão brasileiro
			const dataBr = new Date(material.data).toLocaleDateString("pt-BR");
			const horaBr = new Date(material.data).toLocaleTimeString("pt-BR", {
				hour: "2-digit",
				minute: "2-digit",
			});

			let templateStringDadosEstoque = `
				<div class="col-12 col-md-6 col-lg-4">
					<div class="card h-100 border-0 shadow-sm hover-shadow transition">
						<div class="card-body p-4">
							<div class="d-flex justify-content-between align-items-start mb-3">
								<div>
									<span class="badge bg-light text-dark border fw-normal mb-2">
										ID: # ${material.codigoNumerico}
									</span>
									<h5 class="card-title fw-bold text-dark mb-0">${material.nomeMaterial}</h5>
								</div>
								<div class="text-center">
									<div class="rounded-circle d-flex align-items-center justify-content-center ${material.saldoEstoque < 10 ? "bg-danger-subtle text-danger" : "bg-success-subtle text-success"}" 
										style="width: 50px; height: 50px; border: 2px solid currentColor">
										<span class="fw-bold fs-5">${material.saldoEstoque}</span>
									</div>
									<small class="d-block mt-1 text-muted fw-bold" style="font-size: 0.7rem; text-uppercase">QTD</small>
								</div>
							</div>

							<hr class="opacity-10">

							<div class="row text-muted g-0">
								<div class="col-6 border-end pe-2">
									<small class="d-block text-uppercase" style="font-size: 0.65rem">Cadastro</small>
									<div class="d-flex align-items-center" style="font-size: 0.85rem">
										<i class="bi bi-calendar3 me-2 text-primary"></i> ${dataBr}
									</div>
								</div>
								<div class="col-6 ps-3">
									<small class="d-block text-uppercase" style="font-size: 0.65rem">Horário</small>
									<div class="d-flex align-items-center" style="font-size: 0.85rem">
										<i class="bi bi-clock me-2 text-primary"></i> ${horaBr}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			`;

			containerEstoque.innerHTML += templateStringDadosEstoque;
		});
	}

	function exibeMensagemEstoqueVazio(materiais) {
		if (materiais.length == 0) {
			elEstoqueVazio.innerHTML = `
				<div class="alert alert-danger" role="alert">
					Nenhum material encontrado com as informações escolhidas!
				</div>
			`;
		}

		//limpa o formulario
		formBuscaDados.reset();
	}
});
