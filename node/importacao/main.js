const { gets, print } = require('./funcoes');

let contador = [];
function pegaValor(){
for (let i = 0; i < 5; i++) {
    contador.push(gets())
    }
}

pegaValor();
print(contador);


function ordena(lista){
    swap = true;
    while (swap){
    swap = false;
        for (let i = 0; i < lista.length; i++) {
            
            if (lista[i] > lista[i+1]){
                let mb = lista[i];
                lista[i] = lista[i+1];
                lista[i+1] = mb; 
                swap = true;
            }
        }
    } return lista
}


ordena(contador);
print(contador);

print(`O maior numero da lista de contador é: ${contador[contador.length-1]}`)
print(`O menor numero é: ${contador[0]}`)

