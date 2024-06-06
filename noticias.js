let form3 = document.querySelector('#noticias');
form3.addEventListener('submit', function(event) {
    event.preventDefault();
    let dadosForm = new FormData(form3);
    buscarNoticias(dadosForm.get('buscanoticias'));
});

let resultado3 = document.getElementById('resultadoNoticias');

function buscarNoticias(buscanoticias) {
    const urlApi = new URL('http://servicodados.ibge.gov.br/api/v3/noticias/');
    urlApi.searchParams.append('busca', buscanoticias);

    fetch(urlApi)
    .then(response => {
        if (response.ok) {
            resultado3.innerHTML = null;
            console.log("deu certo");
            return response.json();
        } else {
            resultado3.innerText = "Não foi possível atender sua solicitação.";
            console.log("deu errado");
        }
    })
    .then(data => {
        console.log(data);
        let noticias = data;
        noticias.items.forEach(dados => {
            let tipo = dados.tipo;
            let dataDePub = dados.data_publicacao;
            let titulo = dados.titulo;
            let produtos = dados.produtos;


            let div = document.createElement('div');
            div.className = 'conteiner';

            let divTitulo = document.createElement('div');
            divTitulo.className = 'titulo';
            divTitulo.textContent = `Titulo: ${titulo}`;

            let divData = document.createElement('div');
            divData.className = 'data';
            divData.textContent = `Data de publicação: ${dataDePub}`;

            let divTipo = document.createElement('div');
            divTipo.className = 'tipo';
            divTipo.textContent = `Tipo: ${tipo}`;

            let divProdutos = document.createElement('div');
            divProdutos.className = 'produto';
            divProdutos.textContent = `Produtos: ${produtos || 'Não disponível'}`;

            let elementoDivisor =  document.createElement('hr');

            div.appendChild(divTitulo);
            div.appendChild(divData);
            div.appendChild(divTipo);
            div.appendChild(divProdutos);

            resultado3.appendChild(div);
            resultado3.appendChild(elementoDivisor);
        });
    });
};