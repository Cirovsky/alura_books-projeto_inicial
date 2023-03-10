let livros = [];

const endpointAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json';

const listaElLivros = document.querySelector("[data-lista-livros]");

/* filtros */

const listaFiltros = document.querySelectorAll("[data-filtro]");

listaFiltros.forEach(filtro =>{
    filtro.addEventListener("click", ()=>{
        listaElLivros.innerHTML = "";
        getBuscarLivros(filtro.dataset.filtro);
    });
});

/* ordenação */

function criarElLivro(livro){

    const disponivel = livro.quantidade > 0? '': 'indisponivel';
    listaElLivros.innerHTML += `
<div class="livro">
    <img class="livro__imagens ${disponivel}" src="${livro.imagem}"
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

async function getBuscarLivros(filtro = "vazio"){
    const res = await fetch(endpointAPI);
    livros = await res.json();
    if(livros.erro){
        throw Error('não foi possível conectarmos com a API');
    }else{
        if(filtro == "vazio"){
            livros.forEach( livro => {
                criarElLivro(livro);
            })
        }else{
            const livrosFiltrados = livros.forEach(livro =>{
                if(filtro == "disponivel"){
                    if(livro.quantidade > 0){
                        criarElLivro(livro);
                    }
                }else{
                    if (livro.categoria == filtro){
                        criarElLivro(livro);
                    }
                }
            })
        }
    }
}

const lista = getBuscarLivros();