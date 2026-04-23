import { API_ESTOQUE } from "./api.js";

document.addEventListener('DOMContentLoaded', (event) => {
    console.log("DOM pronto! HTML analisado.");
    const elTabela = document.getElementById("lista-de-estoque");
    const formBuscaDados = document.getElementById("form-busca-dados");

    formBuscaDados.addEventListener("submit", async (e) => {
        const btnClicado = e.submitter;
        e.preventDefault();

        //captura os valores dos campos codigo material e data
        const codigoNumericoValue = document.getElementById("codigoNumerico").value;
        const dataValue = document.getElementById("dataMaterial").value;

        try {
            // 2. Monta a URL com Query Params (URLSearchParams facilita a limpeza de campos vazios)
            const params = new URLSearchParams();
            if(codigoNumericoValue) params.append("codigoNumerico", codigoNumericoValue);
            if(dataValue) params.append("data", dataValue);

            //monta a url completa
            const urlCompleta = `${API_ESTOQUE}?${params.toString()}`;

            let response = await fetch(urlCompleta);

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const materiais = await response.json();
            // console.log(materiais);

            montaTabelaDeEstoque(materiais);
        } catch (error) {
            console.log("Error: " + error);
        }
    });

    function montaTabelaDeEstoque(materiais) {
        elTabela.innerHTML = "<tr><th>Código do Material</th><th>Nome do Material</th><th>Quantidade</th></tr>";

        materiais.forEach(material => {
            const tr = document.createElement("tr");

            let templateStringDadosTabela = `
                <tr>
                    <td>${material.codigoNumerico}</td>
                    <td>${material.nomeMaterial}</td>
                    <td>${material.saldoEstoque}</td>
                </tr>
            `;

            tr.innerHTML = templateStringDadosTabela;

            elTabela.appendChild(tr);
        });
    }
});