class Carro{
    marca;
    cor;
    media;

    constructor(marca, cor, media){
        this.marca = marca;
        this.cor = cor;
        this.media = media;
    }

    gastoMedioKm(quantidadeDeKm, preçoGasolina){
        
        let totalMedia = quantidadeDeKm / this.media;
        let totalValor = totalMedia * preçoGasolina;
        console.log(`Se o seu carro tem a media de ${this.media}, e o preço da gasolina está ${preçoGasolina}.`);
        console.log(`Se a distancia percorrida foi ${quantidadeDeKm}, seu total gasto foi: ${totalValor.toFixed(2)}`);

    }
}

let mustang = new Carro('Ford', 'Verde', 14);

console.log(mustang)

mustang.gastoMedioKm(100, 5.40);