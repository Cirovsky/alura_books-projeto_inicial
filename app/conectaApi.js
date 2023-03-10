const url = "https://guilhermeonrails.github.io/casadocodigo/livros.json";

async function listaLivros () {
    const conexao = await fetch(url);
    const conexaoConvertida = await conexao.json();
    console.log(conexaoConvertida);
}

export const conectaApi = {
    listaLivros,
}