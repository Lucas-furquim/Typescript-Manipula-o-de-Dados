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

export async function fetchProduto() {
  const response = await fetch('https://api.origamid.dev/json/transacoes.json');
  const json = await response.json();
  return mostraDados(json);
}

async function mostraDados(clientes: unknown) {
  if (Array.isArray(clientes)) {
    const dados = document.querySelector('.dados');
    if (dados) {
      dados.innerHTML += `
          <div>
          <ul>
          <h2 class='dadosInfo'>Nome</h2>
          ${manipulaDados(clientes, 'Nome')}
            </ul>
                     <ul>
          <h2 class='dadosInfo'>Email</h2>
          ${manipulaDados(clientes, 'Email')}
            </ul>

                                 <ul>
          <h2 class='dadosInfo'>Compra</h2>
          ${manipulaDados(clientes, 'Valor (R$)')}
            </ul>
                                 <ul>
          <h2 class='dadosInfo'>Pagamento</h2>
          ${manipulaDados(clientes, 'Forma de Pagamento')}
            </ul>
                                 <ul>
          <h2 class='dadosInfo'>Status</h2>
          ${manipulaDados(clientes, 'Status')}
            </ul>
          </div>
          `;
    }
  }
}

function manipulaDados(clientes: unknown, tipo: keyof Clientes) {
  if (Array.isArray(clientes)) {
    return clientes
      .map((cliente) => {
        if (isClientes(cliente)) {
          console.log(cliente[tipo]);
          return `<li>R$ ${cliente[tipo]}</li>`;
        }
        return '';
      })
      .join('');
  }
  return '';
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
