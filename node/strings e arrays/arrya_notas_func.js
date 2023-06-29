/*let alunos = ['thalis', 'carol', 'amanda'];

alunos.push('doki')
alunos.pop();
alunos[1]='10';
alunos.shift();

console.log(alunos)
*/

let notas = [4,5,8,9,10]
let notas2 = [10, 9, 10]


function somanotas(lista){

    let notaMax = 0;

for (let i in lista) {
    notaMax = lista[i] + notaMax;
    };

    return (notaMax/lista.length).toFixed(2);
};

console.log(somanotas(notas2))