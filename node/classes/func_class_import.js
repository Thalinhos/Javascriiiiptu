import { Pessoa } from './Pessoa.js';




const thalis = new Pessoa('thalinhos', 24);
const leda = new Pessoa('ledinha', 81);


function compararPessoas(p1, p2){
    if (p1.idade > p2.idade){
        console.log(`${p1.nome} é mais velho(a) que ${p2.nome}`)
    }
    else if(p1.idade < p2.idade){
        console.log(`${p2.nome} é mais velho(a) que ${p1.nome}`)
    }else{
        console.log('Ambos tem a mesma idade')
    }
}

compararPessoas(thalis, leda)