///////////////////// função Nome
let form = document.querySelector('#nomes');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    let dadosForm = new FormData(form);
    buscarLocalidade(dadosForm.get('busca'));
})

function buscarLocalidade(busca) {
    const buscaEncoded = encodeURIComponent(busca);
    const urlApi = new URL(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${buscaEncoded}`);

    fetch(urlApi)
    .then(response => {
        let resultado = document.getElementById('resultado');
        if (response.ok) {
            resultado.innerHTML = null;
            console.log("deu certo");
            return response.json();
        } else {
            resultado.innerText = "Não foi possível atender sua solicitação.";
            console.log("deu errado");
        }
    })
    .then(data => {
        let nomes = data;
        nomes.forEach(dados => {
          let nome = dados.nome;
          let localidade = dados.localidade;

          dados.res.forEach(dado =>{
            let periodo = dado.periodo;
            let frequencia = dado.frequencia;

            let div = document.createElement('div');
            div.className = 'conteiner1';

            let divNome = document.createElement('div');
            divNome.className = 'nome';
            divNome.textContent = `Nome: ${nome}`;

            let divPeriodo = document.createElement('div');
            divPeriodo.className = 'periodo';
            divPeriodo.textContent = `Período: ${periodo}`;

            let divFrequencia = document.createElement('div');
            divFrequencia.className = 'frequencia';
            divFrequencia.textContent = `Frequência: ${frequencia}`;

            let divLocalidade = document.createElement('div');
            divLocalidade.className = 'localidade';
            divLocalidade.textContent = `Localidade: ${localidade || 'Não disponível'}`;

            let elementoDivisor =  document.createElement('hr');

            div.appendChild(divNome);
            div.appendChild(divPeriodo);
            div.appendChild(divFrequencia);
            div.appendChild(divLocalidade);

            resultado.appendChild(div);
            resultado.appendChild(elementoDivisor);
          })
        });
    });
};