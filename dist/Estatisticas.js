export async function fetchProdutoEstatisticas() {
    const response = await fetch('https://api.origamid.dev/json/transacoes.json');
    const json = await response.json();
    return MostraDados(json);
}
function MostraDados(clientes) {
    let soma = 0;
    const esta = document.querySelector('.estatisticas');
    if (Array.isArray(clientes)) {
        clientes.map((cliente) => {
            if (isClientes(cliente)) {
                if (cliente['Valor (R$)'] !== '-') {
                    let transforma = cliente['Valor (R$)']
                        .replace('.', '')
                        .replace(',', '.');
                    soma += +transforma;
                    const formataValor = soma.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    });
                    if (esta) {
                        esta.innerHTML = `
            <div>
            <h1>Estatisticas</h1>
             <div class='total'>
            Total: ${formataValor}
              </div>





            </div>
            `;
                    }
                }
            }
        });
    }
}
function isClientes(cliente) {
    if (cliente &&
        typeof cliente === 'object' &&
        'Cliente Novo' in cliente &&
        'Data' in cliente &&
        'Email' in cliente &&
        'Forma de Pagamento' in cliente &&
        'ID' in cliente &&
        'Nome' in cliente &&
        'Status' in cliente &&
        'Valor (R$)' in cliente) {
        return true;
    }
    else {
        return false;
    }
}
//# sourceMappingURL=Estatisticas.js.map