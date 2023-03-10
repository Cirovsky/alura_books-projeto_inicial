let livros = [];
let livrosFiltrados = [];
let filtroAtual = false;

const endpointAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json';

const listaElLivros = document.querySelector("[data-lista-livros]");

/* filtros */

const listaFiltros = document.querySelectorAll("[data-filtro]");

listaFiltros.forEach(filtro => {
    filtro.addEventListener("click", () => {
        listaElLivros.innerHTML = "";
        getBuscarLivros(filtro.dataset.filtro);
    });
});

/* ordenação */

const ordenarPreco = document.querySelector("[data-ordem-preco");
ordenarPreco.addEventListener("click", () => {
    ordernarLivros();
});


/* criar elementos */

function criarElLivro(livro) {

    const disponivel = livro.quantidade > 0 ? '' : 'indisponivel';
    listaElLivros.innerHTML += `
<div class="livro" data-livro>
    <img class="livro__imagens ${disponivel}" src="${livro.imagem}"
      alt="${livro.alt}" data-imagem/>
    <h2 class="livro__titulo " data-titulo>
      ${livro.titulo}
    </h2>
    <p class="livro__descricao" data-autor>${livro.autor}</p>
    <p class="livro__preco" id="preco" data-preco = "${livro.preco}">${livro.preco}</p>
    <div class="tags">
      <span class="tag" data-categoria>${livro.categoria}</span>
    </div>
  </div>`;
}

/* função para dinamica da página */

async function getBuscarLivros(filtro = "vazio") {
    const res = await fetch(endpointAPI);
    livros = await res.json();
    if (livros.erro) {
        throw Error('não foi possível conectarmos com a API');
    } else {
        if (filtro == "vazio") {
            filtroAtual = false;
            livros.forEach(livro => {
                criarElLivro(livro);
            })
        } else {
            filtroAtual = true;
            if (filtro == "disponivel") {
                livrosFiltrados = livros.filter(livro => {
                    if (livro.quantidade > 0) {
                        return livro;
                    }
                });
            } else {
                livrosFiltrados = livros.filter(livro => {
                    if (livro.categoria == filtro) {
                        return livro;
                    }
                });
            }
            livrosFiltrados.forEach(livro => {
                criarElLivro(livro);
            })
        }
    }
}

async function pesquisarLivro(titulo) {
    const res = await fetch(endpointAPI);
    const livros = await res.json();

    if (livros.erro) {
        throw Error('não foi possível conectarmos com a API');
    } else {
        livros.forEach(livro => {
            if (livro.titulo == titulo) {

            }
        })

    }

}

function ordernarLivros() {
    if(filtroAtual){
        const novaOrdemLivros = livrosFiltrados.sort(function (a,b) {
            if(a.preco > b.preco){
                return 1;
            }
            if(a.preco < b.preco){
                return -1;
            }
            return 0;
        });
        listaElLivros.innerHTML = ""
        novaOrdemLivros.forEach(livro => criarElLivro(livro));
    }else{
        const novaOrdemLivros = livros.sort(function (a,b) {
            if(a.preco > b.preco){
                return 1;
            }
            if(a.preco < b.preco){
                return -1;
            }
            return 0;
        })
        listaElLivros.innerHTML = ""
        novaOrdemLivros.forEach(livro => criarElLivro(livro));
    }
}


/* chamadas a priori */

const lista = getBuscarLivros();