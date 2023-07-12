const miniTwitter = {
    usuarios: {

      thalis: {
        post: [{
          id: 0,
          content: 'this is a content of thalis'
        }]
      },

      maria: {
        post: [{
          id: 0,
          content: 'this is a content of maria'
        }]
    }
  }
};


function createPost(name, content) {
    if (name in miniTwitter.usuarios) {
      miniTwitter.usuarios[name].post.push({
        id: miniTwitter.usuarios[name].post.length, 
        content: content
      });
    }
  }

function updatePost(name, id, newContent){
    if (name in miniTwitter.usuarios) {
        if (id in miniTwitter.usuarios[name].post){
            miniTwitter.usuarios[name].post[id].content = newContent;
        }else{
            console.log('Id not found');
        }
    }
}

function deletePost(name, id){
    if (name in miniTwitter.usuarios) {
        if (id in miniTwitter.usuarios[name].post){
            miniTwitter.usuarios[name].post.splice(id, 1);
        }else{
            console.log('Id not found');
        }
    }
}

  
createPost('thalis', 'this is a content of thalis part 2');
createPost('maria', 'this is a content of maria part 2');
createPost('thalis', 'this is a content of thalis part 3');
console.log(miniTwitter.usuarios.thalis.post);

updatePost('thalis', 0, 'this is a HUGE content');
console.log(miniTwitter.usuarios.thalis.post);

deletePost('thalis', 0);
console.log(miniTwitter.usuarios.thalis.post);


