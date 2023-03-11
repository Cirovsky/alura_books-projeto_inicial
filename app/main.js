/* negócio */
function aplicarDesconto(livros){
    const desconto = 0.3;
    estado.livros = livros.map(livro =>{
        return {... livro, preco: livro.preco -(livro.preco * desconto)}
    })
}

const endpointAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json';

/* funções para dinamica da página */

async function getBuscarLivros() {
    const res = await fetch(endpointAPI);
    const livros = await res.json();
    estado.livros = livros;
    if (livros.erro) {
        throw Error('não foi possível conectarmos com a API');
    } else {
        aplicarDesconto(estado.livros);
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


/* chamadas a priori */

const lista = getBuscarLivros();