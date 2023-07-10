const url = 'https://jsonplaceholder.typicode.com/todos/1';

async function getUrl(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    updateHTML(data);
}

function updateHTML(data) {
    document.getElementById('userId').innerText = data.userId;
    document.getElementById('id').innerText = data.id;
    document.getElementById('title').innerText = data.title;
    document.getElementById('completed').innerText = `Status: ${data.completed}`;
}