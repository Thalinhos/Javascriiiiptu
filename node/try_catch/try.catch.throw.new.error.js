erro = Infinity

try{
    let num1 = 100 / 2
    if (num1 === Infinity){
        throw new Error()
    }
    else{
        console.log(num1)
    }
}
catch(erro){
    console.log('Voce nao pode dividir por zero!')
}