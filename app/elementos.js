const listaElLivros = document.querySelector("[data-lista-livros]");

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
    <p class="livro__preco" id="preco">R$ ${livro.preco.toFixed(2)}</p>
    <div class="tags">
      <span class="tag" data-categoria>${livro.categoria}</span>
    </div>
  </div>`;
}

function reexibirLivros(listaLivros){
    listaElLivros.innerHTML = "";
    listaLivros.forEach(livro => criarElLivro(livro));
}