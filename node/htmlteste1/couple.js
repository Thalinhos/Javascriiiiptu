const url = 'https://jsonplaceholder.typicode.com/todos';

async function getUrl(url) {
    const response = await fetch(url);
    const data = await response.json();
    const data10 = [];
    for (let i = 0; i < 10; i++) {
        data10.push(data[i]);
    }
    updateHTML(data10);
}


function updateHTML(data10) {
    const itensContainer = document.getElementById('itensContainer');

    data10.forEach(item => {
        const itensDiv = document.createElement('div');
        itensDiv.innerHTML = `
        
        <h1 class="userId"> Bem vindo id: ${item.id} </h1>
        <h2 class="title">Your title: ${item.title} </h2>
        <p class="complete">Bool: ${item.completed} </p>
        
        `;
        itensContainer.appendChild(itensDiv);
    })
}