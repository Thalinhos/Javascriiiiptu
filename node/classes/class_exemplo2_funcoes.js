class Pessoa{
    nome;
    peso;
    altura

    constructor(nome, peso, altura){
        this.nome = nome;
        this.peso = peso;
        this.altura = altura;
    }

    imc(peso, altura){
        let valorImc = this.peso / (this.altura * 2);
        console.log(`Seu imc é: ${valorImc.toFixed(2)}.`);
    }
}

let thalis = new Pessoa('thalinhos', 78, 1.75);

console.log(thalis);
thalis.imc()