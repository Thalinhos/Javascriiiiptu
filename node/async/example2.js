let url = 'https://jsonplaceholder.typicode.com/users';

async function getUserData(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json
}

async function printUserData(url) {
    const results = await getUserData(url);
    const user1 = results[0]
    console.log(`Hello, ${user1.name}`)
    console.log(`Heres your email: ${user1.email}`)
    console.log(`Heres your address: ${user1.address.street}, ${user1.address.suite}, in ${user1.address.city} city!`)
}

printUserData(url)
