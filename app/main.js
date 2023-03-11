/* variáveis de maior escopo */
const estado = {
    livros: [],
    filtros: [],
    livrosFiltrados: "",
    livrosDisponiveis: "",
    livrosFiltradosDisponiveis: "",
    disponivel: false,
    ordem: false,
}

const endpointAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json';

const listaElLivros = document.querySelector("[data-lista-livros]");

/* filtros */

const selecionaFiltros = document.querySelector("[data-filtros]");

selecionaFiltros.addEventListener("click", (e) => {
    const filtro = e.target.dataset.filtro;
    if (e.target.dataset.filtro) {
        if (estado.filtros.includes(filtro)) {
            const index = estado.filtros.indexOf(filtro);
            e.target.classList.remove("filtro-selecionado");
            estado.filtros.splice(index, 1);
            filtrarLivros();
        } else {
            estado.filtros.push(filtro);
            e.target.classList.add("filtro-selecionado");
            filtrarLivros();
        }
    }

    if (e.target.dataset.disponivel == "") {
        estado.disponivel = estado.disponivel ? false : true;
        estado.disponivel ?
            e.target.classList.add("filtro-selecionado")
            : e.target.classList.remove("filtro-selecionado");
        filtrarDisponiblidade();
    }

    if (e.target.dataset.ordem == "") {
        estado.ordem = estado.ordem == false ? true : false;
        estado.ordem ?
            e.target.classList.add("filtro-selecionado")
            : e.target.classList.remove("filtro-selecionado");
        let listaLivros;
        const filtrado = estado.filtros.length > 0 ? true : false;
        if (filtrado && estado.disponivel) {
            listaLivros = estado.livrosFiltradosDisponiveis;
        }
        if (filtrado && !estado.disponivel) {
            listaLivros = estado.livrosFiltrados;
        }
        if (!filtrado && estado.disponivel) {
            listaLivros = estado.livrosDisponiveis;
        }
        if (!filtrado && !estado.disponivel) {
            listaLivros = estado.livros;
        }
        listaLivros = ordernarLivros(listaLivros);
        reexibirLivros(listaLivros);
    }

})

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

function reexibirLivros(listaLivros){
    listaElLivros.innerHTML = "";
    listaLivros.forEach(livro => criarElLivro(livro));
}

/* funções para dinamica da página */

async function getBuscarLivros() {
    const res = await fetch(endpointAPI);
    estado.livros = await res.json();
    if (estado.livros.erro) {
        throw Error('não foi possível conectarmos com a API');
    } else {
        estado.livros.forEach(livro => {
            criarElLivro(livro);
        })
        estado.livrosDisponiveis = estado.livros.filter(livro => {
            if (livro.quantidade > 0) {
                return livro;
            }
        })
    }
}

function filtrarLivros() {
    let listaFiltrada;
    if (estado.filtros.length > 0) {
        estado.livrosFiltrados = estado.livros.filter(livro => {
            if (estado.filtros.includes(livro.categoria)) {
                return livro;
            }
        })
        estado.livrosFiltradosDisponiveis = estado.livrosFiltrados.filter(livro => {
            if (livro.quantidade > 0) {
                return livro;
            }
        })
        if (estado.disponivel) {
            listaFiltrada = estado.livrosFiltradosDisponiveis.filter(livro => {
                if (estado.filtros.includes(livro.categoria)) {
                    return livro;
                }
            })
        } else {
            listaFiltrada = estado.livrosFiltrados.filter(livro => {
                if (estado.filtros.includes(livro.categoria)) {
                    return livro;
                }
            })
        }
        if(estado.ordem){
            listaFiltrada = ordernarLivros(listaFiltrada);
            reexibirLivros(listaFiltrada);
        }else{
            reexibirLivros(listaFiltrada);
        }
    } else {
        if (estado.ordem){
            listaFiltrada = estado.livros.map(livros => livros);
            listaFiltrada = ordernarLivros(listaFiltrada);
            reexibirLivros(listaFiltrada);
        }else{
            reexibirLivros(estado.livros);
        }
    }
}

function filtrarDisponiblidade() {
    let listaDisponiveis;
    if (estado.disponivel) {
        if (estado.filtros.length > 0) {
            listaDisponiveis = estado.livrosFiltradosDisponiveis.map(livro => livro);
        } else {
            listaDisponiveis = estado.livrosDisponiveis.map(livro => livro);
        }
    } else {
        if (estado.filtros.length > 0) {
            listaDisponiveis = estado.livrosFiltrados.map(livro => livro);
        } else {
            listaDisponiveis = estado.livros.map(livro => livro);
        }
    }
    if(estado.ordem){
        listaDisponiveis = ordernarLivros(listaDisponiveis);
        reexibirLivros(listaDisponiveis);
    }else{
        reexibirLivros(listaDisponiveis);
    }
}

function ordernarLivros(listaLivros) {

    listaOrdenada = listaLivros.map(livro => livro);

    if (estado.ordem) {
        listaOrdenada.sort(function (a, b) {
            if (a.preco > b.preco) {
                return 1;
            }
            if (a.preco < b.preco) {
                return -1;
            }
            return 0;
        })
        return listaOrdenada;

    } else {
        return listaLivros;
    }
}

/* chamadas a priori */

const lista = getBuscarLivros();