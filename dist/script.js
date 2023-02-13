import normalizarTransacao from './normalizarTransacao.js';
import fetchData from "./fetchData.js";
import Estatisticas from './Estatisticas.js';
async function handleData() {
    const data = await fetchData('https://api.origamid.dev/json/transacoes.json?');
    if (!data)
        return;
    const transacoes = data.map(normalizarTransacao);
    preencherTable(transacoes);
    preencherEstatisticas(transacoes);
}
function preecherLista(lista, containerId) {
    const containerElement = document.getElementById(containerId);
    if (containerElement) {
        Object.keys(lista).forEach(key => {
            containerElement.innerHTML += `<p>${key}: ${lista[key]}</p>`;
        });
    }
}
function preencherEstatisticas(transacoes) {
    const data = new Estatisticas(transacoes);
    preecherLista(data.pagamento, 'pagamento');
    preecherLista(data.status, 'status');
    const totalElement = document.querySelector("#total span");
    if (totalElement) {
        totalElement.innerText = data.total.toLocaleString('pt-BR', {
            style: "currency",
            currency: "BRL"
        });
    }
    const diaElement = document.querySelector("#dia span");
    if (diaElement) {
        diaElement.innerText = data.melhorDia[0];
    }
}
function preencherTable(transacoes) {
    const tabela = document.querySelector('#transacoes tbody');
    if (!tabela)
        return;
    transacoes.forEach(transacao => {
        tabela.innerHTML += `
            <tr>
                <td>${transacao.nome}</td>
                <td>${transacao.email}</td>
                <td>R$ ${transacao.moeda}</td>
                <td>${transacao.pagamento}</td>
                <td>${transacao.status}</td>
            </tr>
        `;
    });
}
handleData();
//# sourceMappingURL=script.js.map