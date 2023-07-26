function main(){
    const form1 = document.querySelector('.form1');

    form1.addEventListener('submit', function(event){
        event.preventDefault();
        
        const nome = form1.querySelector('#nome');
        const sobrenome = form1.querySelector('#sobrenome');
        const email = form1.querySelector('#email');

        obj(nome, sobrenome, email);
        jogaName(nome, sobrenome, email);
        console.log(list)
    })

    const list = []

    const obj = (nome, sobrenome, email) => {
        list.push({
            nome: nome.value,
            sobrenome: sobrenome.value,
            email: email.value
        })
    }

    const jogaName = (nome, sobrenome, email) => {
        const resultados = document.querySelector('.resultados');
        let noContent = document.querySelector('.noContent');
        if (nome.value !== ''){
            noContent.style.display = 'none';
            resultados.innerHTML += `<div><p>Seu nome é ${nome.value}</p>
                              <p>Seu sobrenome é ${sobrenome.value}</p>
                              <p>Seu email é ${email.value}</p></div>`;
        }else{
            alert('Insira seus dados')
        }
    }
}

main();