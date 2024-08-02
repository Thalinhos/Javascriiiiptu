const html = '<h1 id="ValueOn----</h1>-<h1----id=--------<h1 id="ValueOne>textp textp texto</h1>--------------------';
const tagToFind = 'id="ValueOne"';

function findTag(html, tag){
    const objIndex = [];
    for(let i in tag){
        for(let i = 0; i < html.length + 1; i++){
            if(tag.includes(html[i])){
                if(tag.includes(html[i+1])){
                objIndex.push({
                        letter: html[i],
                        index: i
                    })
                }
            }
        }
        objIndex.push({letter: html[objIndex[objIndex.length-1].index+1], index: objIndex[objIndex.length-1].index+1})
    }
    return objIndex
}

function getRealData(){
    const data = findTag(html, tagToFind)
    const arrayValue = []
    for(let i in html){
        if(i <= data[data.length-1].index+1){
            continue
        }
        if(html[i] === '<'){
            break
        }
        arrayValue.push(html[i])
    }
    return arrayValue.join('')
}


console.log(getRealData())

