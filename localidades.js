let form5 = document.querySelector('#locais');
form5.addEventListener('submit', function(event) {
    event.preventDefault();
    let dadosForm = new FormData(form5);
    buscarlocalidade(dadosForm.get('buscaLocal'));
});

let resultado5 = document.getElementById('resultadoLocal');

function buscarlocalidade(buscaLocal) {
    const buscaEncoded = encodeURIComponent(buscaLocal);
    const urlApi = new URL(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${buscaEncoded}/distritos`);
    urlApi.searchParams.append('orderBy', 'nome');

    fetch(urlApi)
    .then(response => {
        if (response.ok) {
            resultado5.innerHTML = null;
            console.log("deu certo");
            return response.json();
        } else {
            resultado5.innerText = "Não foi possível atender sua solicitação.";
            console.log("deu errado");
        }
    })
    .then(data => {
        console.log(data);
        let locais = data;
        locais.forEach(dados => {
            let nome = dados.nome;
            let id = dados.id;
            let nomeMunicipio = dados.municipio.nome;


            let div = document.createElement('div');
            div.className = 'conteiner';

            let divNome = document.createElement('div');
            divNome.className = 'distrito';
            divNome.textContent = `Distrito: ${nome}`;

            let divId = document.createElement('div');
            divId.className = 'Id';
            divId.textContent = `Id Distrito: ${id}`;

            let divNomeMunicipio = document.createElement('div');
            divNomeMunicipio.className = 'Municipio';
            divNomeMunicipio.textContent = `Municipio: ${nomeMunicipio}`;

            let elementoDivisor =  document.createElement('hr');

            div.appendChild(divNome);
            div.appendChild(divId);
            div.appendChild(divNomeMunicipio);

            resultado5.appendChild(div);
            resultado5.appendChild(elementoDivisor);
        });
    });
};