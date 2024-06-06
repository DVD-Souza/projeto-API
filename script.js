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
        if (response.ok) {
            console.log("deu certo");
            return response.json();
        } else {
            let resultado = document.getElementById('resultado');
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

            div.appendChild(divNome);
            div.appendChild(divPeriodo);
            div.appendChild(divFrequencia);
            div.appendChild(divLocalidade);

            resultado.appendChild(div);
          })
        });
    });
  }  
      /*.catch(error => {
        console.error("Erro ao fazer a requisição:", error);
        let resultado = document.getElementById('resultado');
        resultado.innerText = "Ocorreu um erro ao processar a solicitação.";
    });
}


let form = document.getElementById('formulario');
form.addEventListener('submit',function(event){
    event.preventDefault()
    let dadosform = new FormData(form)
    console.log(dadosform.get('filme'))
    buscarFilmes(dadosform.get('filme'))
})

function buscarFilmes (nomeFilme){
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YjZhYzk1NTFjMTAxNGNmYzg1MzQ4ZjJhNTI5MWYzMiIsInN1YiI6IjY1MzkyOWNhMGZiMTdmMDBlMTE2M2I0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lJCg_oE2doRNH7VVrJHk1iZ44eNMdXfDkMCb5mPtySM'
    }
  };
    
  let urlApi = new URL ("https://api.themoviedb.org/3/search/movie")
  urlApi.searchParams.append('query',nomeFilme)
  urlApi.searchParams.append('include_adult',false)
  urlApi.searchParams.append('language',"pt-BR")
  fetch(urlApi,options)
  .then(response=>{
    if(response.ok==true){
      console.log("Deu bom")
      return response.json()
    }
    else{
      console.log("Deu Ruim")
      let resultado = document.getElementById("resultado")
      resultado.innertext = "Não foi possivel achar seu filme. Tente novamente mais tarde"
    }
  })
  .then(data=>{
    let filmes = data.results
    filmes.forEach(filme => {
      console.log(filme.title)
      console.log(filme.overview)
      console.log("https://image.tmdb.org/t/p/w500"+filme.poster_path)
      
      let divFilme = document.createElement('div')
      let divImagem = document.createElement('div')
      let divConteudo = document.createElement('div')
    });
  })
}*/