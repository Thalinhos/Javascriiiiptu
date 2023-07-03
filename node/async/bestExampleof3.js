let url = 'https://jsonplaceholder.typicode.com/users';

async function getUserData(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json
}

async function printUserData(url) {
    const results = await getUserData(url);
    const user = results;
    const numberOfUsers = 5;
    for (let i = 0; i < numberOfUsers; i++) {
        console.log(`Hello, ${user[i].name}`)
        console.log(`Heres your email: ${user[i].email}`)
        console.log(`Heres your address: ${user[i].address.street}, ${user[i].address.suite}, in ${user[i].address.city} city!`)
        console.log('')
    }
   
}

printUserData(url)