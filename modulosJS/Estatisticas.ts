interface Clientes {
  'Cliente Novo': number;
  Data: string;
  Email: string;
  'Forma de Pagamento': string;
  ID: number;
  Nome: string;
  Status: string;
  'Valor (R$)': string;
}

let somaTotal = 0;
let somaCartão = 0;
let somaBoleto = 0;
//
let paga = 0;
let recusada = 0;
let aguardando = 0;
let estornada = 0;
// let paga = 0

export async function fetchProdutoEstatisticas() {
  const response = await fetch('https://api.origamid.dev/json/transacoes.json');
  const json = await response.json();
  return MostraDados(json);
}

function MostraDados(clientes: unknown) {
  const esta = document.querySelector('.estatisticas');
  if (Array.isArray(clientes)) {
    clientes.map((cliente) => {
      if (isClientes(cliente)) {
        const formataValor = retornaTotal(cliente);
        retornaCartão(cliente);
        Pagamentos(cliente);

        if (esta) {
          esta.innerHTML = `
            <div>
            <h1>Estatisticas</h1>
             <div class='total'>
            Total: ${formataValor}
              </div>

            <div class='pagamento'>
            <p>Cartão de Crédito: ${somaCartão}</p>
           <p> Boleto: ${somaBoleto}</p>
              </div>

            <div class='status'>
           <p> Paga: ${paga}</p>
           <p> Recusada pela operadora de cartão: ${recusada}</p>
           <p> Aguardando Pagamento: ${aguardando}</p>
           <p> Estornada: ${estornada}</p>
              </div>



            </div>
            `;
        }
      }
    });
  }
}

function Pagamentos(cliente: Clientes) {
  if (cliente.Status === 'Paga') {
    paga += 1;
  } else if (cliente['Status'] === 'Aguardando pagamento') {
    aguardando += 1;
  } else if (cliente['Status'] === 'Recusada pela operadora de cartão') {
    recusada += 1;
  } else {
    estornada += 1;
  }
}

function retornaCartão(cliente: Clientes) {
  if (cliente['Forma de Pagamento'] === 'Cartão de Crédito') {
    somaCartão += 1;
    return somaCartão;
  } else {
    somaBoleto += 1;
    return somaBoleto;
  }
}

function retornaTotal(cliente: Clientes) {
  if (cliente['Valor (R$)'] !== '-') {
    let transforma = cliente['Valor (R$)'].replace('.', '').replace(',', '.');

    somaTotal += +transforma;

    const formataValor = somaTotal.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    return formataValor;
  } else {
    return '';
  }
}

function isClientes(cliente: unknown): cliente is Clientes {
  if (
    cliente &&
    typeof cliente === 'object' &&
    'Cliente Novo' in cliente &&
    'Data' in cliente &&
    'Email' in cliente &&
    'Forma de Pagamento' in cliente &&
    'ID' in cliente &&
    'Nome' in cliente &&
    'Status' in cliente &&
    'Valor (R$)' in cliente
  ) {
    return true;
  } else {
    return false;
  }
}
