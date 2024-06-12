let form4 = document.querySelector('#produtos');
form4.addEventListener('submit', function(event) {
    event.preventDefault();
    let dadosForm = new FormData(form4);
    buscarProdutos(dadosForm.get('buscaprodutos'));
});

let resultado4 = document.getElementById('resultadoprodutos');

function buscarProdutos(buscaprodutos) {
    const urlApi = new URL('https://servicodados.ibge.gov.br/api/v1/produtos/');
    urlApi.searchParams.append('titulo', buscaprodutos);
    //Os parametros de busca não englobam um limitador de quantidade de produtos por pagina. 

    fetch(urlApi)
    .then(response => {
        if (response.ok) {
            resultado4.innerHTML = null;
            console.log("deu certo");
            return response.json();
        } else {
            resultado4.innerText = "Não foi possível atender sua solicitação.";
            console.log("deu errado");
        }
    })
    .then(data => {
        console.log(data);
        let produtos = data;
        produtos.forEach(dados => {
            let tipo = dados.tipo;
            let id = dados.id;
            let titulo = dados.titulo;
            let alias = dados.alias;


            let div = document.createElement('div');
            div.className = 'conteiner';

            let divTitulo = document.createElement('div');
            divTitulo.className = 'titulo';
            divTitulo.textContent = `Titulo: ${titulo}`;

            let divId = document.createElement('div');
            divId.className = 'id';
            divId.textContent = `Identificador: ${id}`;

            let divTipo = document.createElement('div');
            divTipo.className = 'tipo';
            divTipo.textContent = `Tipo: ${tipo}`;

            let divAlias = document.createElement('div');
            divAlias.className = 'alia';
            divAlias.textContent = `Alias: ${alias || 'Não possui.'}`;

            let elementoDivisor =  document.createElement('hr');

            div.appendChild(divTitulo);
            div.appendChild(divId);
            div.appendChild(divTipo);
            div.appendChild(divAlias);

            resultado4.appendChild(div);
            resultado4.appendChild(elementoDivisor);
        });
    });
};