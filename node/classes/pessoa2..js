class User{

    constructor(name, email, phone){
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    greeting() {
        console.log(`Hi, my name is ${this.name}, my email is ${this.email} and thats my phone ${this.phone}`);
    }
}

const thalis = new User('thalisson', 'thalissonvieira@hotmail.com.br', '981302801');

thalis.greeting();
console.log(thalis.name)
