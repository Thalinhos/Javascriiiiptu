const fs = require('fs');


    const content = '\nolá mundooo NOVO';

    fs.appendFile('./index.txt', content, (err, data) => {
        if(err){
            console.error(error);
            return;
        }
        console.log(data);
    })


    



fs.readFile('./index.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(data);
})
