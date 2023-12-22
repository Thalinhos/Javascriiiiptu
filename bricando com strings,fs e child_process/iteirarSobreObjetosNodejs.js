let frutinhas = {
    abacate: 3,
    morango: 5,
    cebola: 1
};

let indicacaoFrutas = {
    abacate: 5,
    morango: 5,
    cebola: 3
};


function baterCompras(arrayFrutas, arrayIndicacao) {
    for (key in arrayFrutas) {
        
            if (arrayFrutas[key]!== arrayIndicacao[key]) {
                console.log("Diferente");
                console.log(`Você precisa comprar ${arrayIndicacao[key] - arrayFrutas[key]} kgs de ${key}`);
            } else {
                console.log(`Não precisa comprar ${key} :D`);
            }
        }console.log("\n")
    }



baterCompras(  frutinhas, indicacaoFrutas );