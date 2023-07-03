function first(callback) {
    console.log('go first');
    callback();
   
    
}

function second(callback) {
    console.log('second!')
    setTimeout(function(){
        callback();
    }, 3000)
    
}

function three() {
    console.log('done!');
}

first(function(){
    second(function(){
        three();
    })
})