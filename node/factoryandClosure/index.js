function armazenaPessoa() {
    let pessoaCount = 0;

    function criaPessoa(nome, sobrenome, idade) {
        return {
            id: pessoaCount++,
            nome: nome,
            sobrenome: sobrenome,
            idade: idade
        };
    }

    return function(nome, sobrenome, idade) {

        return criaPessoa(nome, sobrenome, idade);
    };
}

const addPessoa = armazenaPessoa();
const list = [];

list.push(addPessoa('Carol', 'Bertolo', 25))
list.push(addPessoa('PadocadaAmandoca', 'Bertolo', 10))
list.push(addPessoa('Ledinha', 'Ferreira', 40))
list.push(addPessoa('thalis', 'vieira', 24))

console.log(list[0].nome, list[0].sobrenome)
