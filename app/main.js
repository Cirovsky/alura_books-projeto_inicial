let livros = [];

const endpointAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json';

const listaElLivros = document.querySelector("[data-lista-livros]");

function criarElLivro(livro){
    listaElLivros.innerHTML += `
<div class="livro">
    <img class="livro__imagens ${livro.quantidade > 0? "": "indisponível"}" src="${livro.imagem}"
      alt="${livro.alt}" />
    <h2 class="livro__titulo">
      ${livro.titulo}
    </h2>
    <p class="livro__descricao">${livro.autor}</p>
    <p class="livro__preco" id="preco">${livro.preco}</p>
    <div class="tags">
      <span class="tag">${livro.categoria}</span>
    </div>
  </div>`;
}

async function getBuscarLivros(){
    const res = await fetch(endpointAPI);
    livros = await res.json();
    if(livros.erro){
        throw Error('não foi possível conectarmos com a API');
    }else{
        livros.forEach( livro => {
            criarElLivro(livro);
        })
    }
}

const lista = getBuscarLivros();
console.log(lista);