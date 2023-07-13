list = [2,3,4,5,6,]

const list2 = list.filter((item) => {
    if (item % 2 === 0) {
        return item
    } 
})

console.log(list)

console.log(list2)