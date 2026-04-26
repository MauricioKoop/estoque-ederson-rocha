import { API_ESTOQUE } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
	const formCadastro = document.getElementById("cadastroMaterial");
	const erroCadastro = document.getElementById("erroCadastro");

	formCadastro.addEventListener("submit", async (e) => {
		e.preventDefault();
		erroCadastro.innerHTML = ""; // Limpa erros anteriores

		const agrupaCampos = {
			codigoNumerico: document
				.getElementById("codigoNumerico")
				.value.trim(),
			nomeMaterial: document.getElementById("nomeMaterial").value.trim(),
			saldoEstoque: Number(document.getElementById("saldoEstoque").value),
		};

		// 2. Validação simples antes de enviar
		if (!agrupaCampos.codigoNumerico || !agrupaCampos.nomeMaterial) {
			erroCadastro.innerHTML =
				"<p>Por favor, preencha todos os campos obrigatórios.</p>";
			return;
		}

		try {
			// 3. Enviando para o Backend
			const response = await fetch(API_ESTOQUE, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(agrupaCampos),
			});

			const resultado = await response.json();

			if (response.ok) {
				console.log("Sucesso:", resultado);
				erroCadastro.innerHTML = resultado.message;
				formCadastro.reset();
			} else {
				// Se o servidor respondeu 400 ou 500
				throw new Error(resultado.error || "Erro ao cadastrar");
			}
		} catch (error) {
			console.error("Erro na requisição:", error);
			erroCadastro.innerHTML = `<p>Erro: ${error.message}</p>`;
		}
	});
});
