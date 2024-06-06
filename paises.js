let form2 = document.querySelector('#paises');
form2.addEventListener('submit', function(event) {
    event.preventDefault();
    let dadosForm = new FormData(form2);
    buscarPaises(dadosForm.get('buscapaises'));
});

let resultado2 = document.getElementById('resultadoPaises');

function buscarPaises(buscapaises) {
    const buscaEncoded = encodeURIComponent(buscapaises);
    const urlApi = new URL(`https://servicodados.ibge.gov.br/api/v1/paises/${buscaEncoded}`);

    fetch(urlApi)
    .then(response => {
        if (response.ok) {
            resultado2.innerHTML = null;
            console.log("deu certo");
            return response.json();
        } else {
            resultado2.innerText = "Não foi possível atender sua solicitação.";
            console.log("deu errado");
        }
    })
    .then(data => {
        console.log(data);
        let paises = data;
        paises.forEach(dados => {
            let id = dados.id.M49;
            let nome = dados.nome.abreviado;
            let area = dados.area.total;
            let localidade = dados.localizacao.regiao.nome;
            let governo = dados.governo.capital.nome;

            dados.linguas.forEach(dado =>{
            let lingua = dado.nome;

            let div = document.createElement('div');
            div.className = 'conteiner';

            let divNome = document.createElement('div');
            divNome.className = 'nome';
            divNome.textContent = `Nome: ${nome}`;

            let divId = document.createElement('div');
            divId.className = 'id';
            divId.textContent = `Id: ${id}`;

            let divArea = document.createElement('div');
            divArea.className = 'area';
            divArea.textContent = `Area em KM2: ${area}`;

            let divLocalidade = document.createElement('div');
            divLocalidade.className = 'localidade';
            divLocalidade.textContent = `Localidade: ${localidade || 'Não disponível'}`;

            let divGoverno = document.createElement('div');
            divGoverno.className = 'governo';
            divGoverno.textContent = `Capital: ${governo}`;

            let divLinguas = document.createElement('div');
            divLinguas.className = 'lingua';
            divLinguas.textContent = `Lingua: ${lingua}`;

            let elementoDivisor =  document.createElement('hr');

            div.appendChild(divNome);
            div.appendChild(divId);
            div.appendChild(divArea);
            div.appendChild(divLocalidade);
            div.appendChild(divGoverno);
            div.appendChild(divLinguas);

            resultado2.appendChild(div);
            resultado2.appendChild(elementoDivisor);
            });
        });
    });
};