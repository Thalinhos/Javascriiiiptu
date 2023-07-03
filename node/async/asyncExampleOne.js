const url = 'https://jsonplaceholder.typicode.com/posts';

async function getData(url) {
    let response = await fetch(url);
    let json = await response.json();
    return json.slice(0,10);
}

async function printData(url) {
    let list = [];
    let results = await getData(url);
    for (let i = 0; i < results.length; i++) {
        list.push(results[i]['body'])
        console.log(list)
    }
}

printData(url)
