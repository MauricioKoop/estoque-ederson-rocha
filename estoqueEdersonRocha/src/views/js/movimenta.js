import {
	API_ESTOQUE,
	API_ESTOQUE_NOME,
	API_ESTOQUE_QUANTIDADE,
} from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
	const feedback = document.getElementById("feedback-container");

	// Função auxiliar para exibir as mensagens padronizadas do Controller
	const exibirResposta = (dados, sucesso = true) => {
		// 'alert alert-success' ou 'alert alert-danger'
		const classe = sucesso
			? "alert alert-success shadow-sm"
			: "alert alert-danger shadow-sm";

		feedback.innerHTML = `
			<div class="${classe} alert-dismissible fade show" role="alert">
				${dados.message || "Operação realizada!"}
			</div>
		`;
	};

	// --- 1. LÓGICA ALTERAR NOME ---
	const formNome = document.getElementById("form-alterar-nome");
	formNome.addEventListener("submit", async (e) => {
		e.preventDefault();
		const codigo = document.getElementById("id-nome").value;
		const nome = document.getElementById("novo-nome").value;

		try {
			const response = await fetch(API_ESTOQUE_NOME, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					codigoNumerico: codigo,
					novoNome: nome,
				}),
			});
			const resultado = await response.json();
			exibirResposta(resultado, response.ok);
			if (response.ok) formNome.reset();
		} catch (error) {
			exibirResposta(
				{ message: "Erro de conexão com o servidor." },
				false,
			);
		}
	});

	// --- 2. LÓGICA SUBTRAIR QUANTIDADE ---
	const formQtd = document.getElementById("form-subtrair-estoque");
	formQtd.addEventListener("submit", async (e) => {
		e.preventDefault();
		const codigo = document.getElementById("id-estoque").value;
		const qtd = document.getElementById("qtd-subtrair").value;

		try {
			const response = await fetch(API_ESTOQUE_QUANTIDADE, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					codigoNumerico: codigo,
					quantidade: Number(qtd),
				}),
			});
			const resultado = await response.json();
			exibirResposta(resultado, response.ok);
			if (response.ok) formQtd.reset();
		} catch (error) {
			exibirResposta(
				{ message: "Erro de conexão com o servidor." },
				false,
			);
		}
	});

	// --- 3. LÓGICA EXCLUIR MATERIAL ---
	const formExcluir = document.getElementById("form-excluir-material");
	formExcluir.addEventListener("submit", async (e) => {
		e.preventDefault();
		const codigo = document.getElementById("id-excluir").value;

		if (
			!confirm(
				"Tem certeza que deseja excluir este material? Esta ação não pode ser desfeita.",
			)
		)
			return;

		try {
			const response = await fetch(API_ESTOQUE, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ codigoNumerico: codigo }),
			});
			const resultado = await response.json();
			exibirResposta(resultado, response.ok);
			if (response.ok) formExcluir.reset();
		} catch (error) {
			exibirResposta(
				{ message: "Erro de conexão com o servidor." },
				false,
			);
		}
	});
});
