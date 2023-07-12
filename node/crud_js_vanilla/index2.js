class Pessoa {
    nome;
    habilidades = []
    constructor(nome) {
            this.nome = nome;}

    greeting(){
        if (this.habilidades[0]) {
            return this.retornaApartirDaSegundaHabilidade();
        }else {
            console.log(`Eu ainda não cheguei la...`)
        }
    }

    setNewHabilidade(novahabilidade){
        let novaSkill = novahabilidade;
        this.habilidades.push({
            id: this.habilidades.length,
            nome: novaSkill
        });
    }

    retornaApartirDaSegundaHabilidade(){
        this.habilidades.forEach(item => {
            console.log('Eu sei ' + item.nome + '!')
        })        
    }
}



let joao = new Pessoa('Joao');
//joao.setNewHabilidades('jogar bola', 'estudar');
//joao.setNewHabilidade('cozinhar')
joao.setNewHabilidade('Passar pano pro corintians')

joao.greeting()